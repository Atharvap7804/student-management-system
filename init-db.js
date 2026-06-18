const db=require('./src/db/db')

const createTableQuery = `
CREATE TABLE IF NOT EXISTS public.students (
    admission_number SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    course VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    date_of_birth DATE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    mobile_number VARCHAR(15) NOT NULL,
    gender VARCHAR(15) NOT NULL,
    address TEXT NOT NULL,
    photo_url VARCHAR(255)
);`;

async function init() {
    try {
        console.log("🚀 Initializing connection handshake with Neon Cloud PostgreSQL...");
        await db.query(createTableQuery);
        console.log("✅ CRITICAL SUCCESS: 'students' data table schema successfully created on Neon Cloud!");
        process.exit(0);
    } catch (err) {
        console.error("❌ CONNECTION REJECTED: Script was unable to reach the database cluster.");
        console.error("Error Details:", err.message);
        process.exit(1);
    }
}

init();