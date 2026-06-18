const db= require('../db/db');

const logActivity = async (actionType, details) => {
    try {
        console.log(`[ACTIVITY LOG] SYSTEM_TIMESTAMP: ${new Date().toISOString()} | ACTION: ${actionType} | DETAILS: ${details}`);
    } catch (err) {
        console.error("Logging engine trace failed:", err.message);
    }
};

//Add a new student
const addStudent= async(req,res)=>{
  const {name, course, year, date_of_birth, email, mobile_number, gender, address } = req.body;
  const photo_url = req.file ? `/uploads/${req.file.filename}` : null; // Save relative file path
  // Backend Form Validation
    if (!name || !course || !year || !date_of_birth || !email || !mobile_number || !gender || !address) {
        return res.status(400).json({ error: "All student fields are explicitly required." });
    }

  try{
     const queryText = `
            INSERT INTO students (name, course, year, date_of_birth, email, mobile_number, gender, address, photo_url)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `;
    const values = [name, course, year, date_of_birth, email, mobile_number, gender, address, photo_url];
    const result = await db.query(queryText, values);
    await logActivity("INSERT_RECORD", `Registered student ID #${result.rows[0].admission_number} - Name: ${name}`);
    res.status(201).json({
      message: "Student added successfully", 
      data: result.rows[0] });

  }catch(err){
    if (err.code === '23505') { // Postgres code for Unique Constraint Violation
            return res.status(400).json({ error: "A student with this Email already exists." });
        }
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Database error" });
  }
}


//Get all students 
const getAllStudents = async (req, res) => {
    try {
        const search = req.query.search || '';
        const courseFilter = req.query.course || '';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const offset = (page - 1) * limit;

      // Dynamic Query Construction with Parameterized Inputs
        let queryConditions = [];
        let queryParams = [];

        // Base Query
        let queryText = `SELECT * FROM public.students WHERE 1=1`;

        if (search) {
            queryParams.push(`%${search}%`);
            const paramIndex = queryParams.length;
            
            const cleanId = search.replace('#', '').trim();
            
            if (!isNaN(cleanId) && cleanId !== '') {
                queryParams.push(parseInt(cleanId));
                queryConditions.push(`(name ILIKE $${paramIndex} OR course ILIKE $${paramIndex} OR admission_number = $${queryParams.length})`);
            } else {
                queryConditions.push(`(name ILIKE $${paramIndex} OR course ILIKE $${paramIndex})`);
            }
        }

        if (courseFilter) {
            queryParams.push(`%${courseFilter}%`);
            queryConditions.push(`course ILIKE $${queryParams.length}`);
        }

        if (queryConditions.length > 0) {
            queryText += ' AND ' + queryConditions.join(' AND ');
        }

        let countQueryText = queryText.replace('SELECT * FROM public.students', 'SELECT COUNT(*) FROM public.students');
        const countResult = await db.query(countQueryText, queryParams);
        const totalStudents = parseInt(countResult.rows[0].count);

      
        queryText += ` ORDER BY admission_number DESC LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
        queryParams.push(limit, offset);

        const result = await db.query(queryText, queryParams);

        const analyticsResult = await db.query(`
            SELECT 
                COUNT(*)::INT as total_count,
                COUNT(DISTINCT course)::INT as total_courses,
                COUNT(CASE WHEN gender = 'Male' THEN 1 END)::INT as male_count,
                COUNT(CASE WHEN gender = 'Female' THEN 1 END)::INT as female_count
            FROM public.students;
        `);
        res.json({
            meta: {
                total_records: totalStudents,
                current_page: page,
                total_pages: Math.ceil(totalStudents / limit) || 1
            },
            analytics: analyticsResult.rows[0] || { total_count: 0, total_courses: 0, male_count: 0, female_count: 0 },
            data: result.rows
        });
    } catch (err) {
        console.error("Transmission failure inside getAllStudents:", err.message);
        res.status(500).json({ error: "Failed to fetch student repository matching metrics" });
    }
};

//Get a single student by ID
const getStudentById = async (req, res) => {
  const {id} = req.params;
  try{
    const result = await db.query('SELECT * FROM public.students WHERE admission_number = $1', [id]);
    if(result.rows.length === 0){
      return res.status(404).json({error: "Student not found"});
    }
    res.json(result.rows[0]);
  }catch(err){
    console.error(err.message);
    res.status(500).json({error: "Failed to fetch student details"});
  }
}

//Update a student by ID
const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, course, year, date_of_birth, email, mobile_number, gender, address } = req.body;
    
    try {
        const currentStudent = await db.query('SELECT * FROM public.students WHERE admission_number = $1', [id]);
        if (currentStudent.rows.length === 0) return res.status(404).json({ error: "Target profile sequence missing." });

        const photo_url = req.file ? `/uploads/${req.file.filename}` : currentStudent.rows[0].photo_url;

        const queryText = `
            UPDATE public.students 
            SET name = $1, course = $2, year = $3, date_of_birth = $4, email = $5, mobile_number = $6, gender = $7, address = $8, photo_url = $9
            WHERE admission_number = $10 RETURNING *;
        `;
        const result = await db.query(queryText, [name, course, year, date_of_birth, email, mobile_number, gender, address, photo_url, id]);

        await logActivity("UPDATE_RECORD", `Modified profiles metadata fields on ID #${id}`);
        res.json({ message: "Student details synchronized successfully!", data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: "Update logic computation rejected" });
    }
};

//Delete a student by ID
const deleteStudent = async (req, res) => {
  const {id} = req.params;

  try{
    const result = await db.query('DELETE FROM public.students WHERE admission_number = $1 RETURNING *', [id]);
    if(result.rows.length === 0){
      return res.status(404).json({error: "Student not found"});
    }
    await logActivity("PURGE_RECORD", `Permanently dropped student ID #${id} from SQL cluster schemas`);
    res.json({
      message: "Student deleted successfully",
      data: result.rows[0]
    });
  }catch(err){
    console.error(err.message);
    res.status(500).json({error: "Failed to delete student"});
  }
}

module.exports={
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
}