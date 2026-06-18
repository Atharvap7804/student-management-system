import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import StudentForm from './components/StudentForm';
import StudentCard from './components/StudentCard';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import { Users, UserPlus } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000/students';

export default function App() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [analytics, setAnalytics] = useState({ total_count: 0, total_courses: 0, male_count: 0, female_count: 0 });

  const [formData, setFormData] = useState({
    name: '', course: '', year: '', date_of_birth: '', email: '', mobile_number: '', gender: '', address: ''
  });
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, [search, courseFilter, page]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}?search=${search}&course=${courseFilter}&page=${page}&limit=6`);
      setStudents(response.data.data);
      setTotalPages(response.data.meta.total_pages);
      if (response.data.analytics) setAnalytics(response.data.analytics);
    } catch (err) {
      console.error("Pipeline failure fetching datasets:", err);
    }
  };

  const handleSubmit = async (navigateInstance) => {
    const payload = new FormData();
    Object.keys(formData).forEach(key => payload.append(key, formData[key]));
    if (photo) payload.append('photo', photo);

    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/${editingId}`, payload);
        alert("🚨 Student profile updated successfully!");
      } else {
        await axios.post(API_BASE_URL, payload);
        alert("✅ Student registered into the system successfully!");
      }
      resetForm();
      fetchStudents();
      // Navigate back to the main student list after submission
      navigateInstance('/');
    } catch (err) {
      alert(err.response?.data?.error || "❌ An error occurred while processing the request.");
    }
  };

  const handleEditInit = (student, navigateInstance) => {
    setEditingId(student.admission_number);
    setFormData({
      name: student.name, course: student.course, year: student.year,
      date_of_birth: student.date_of_birth ? student.date_of_birth.split('T')[0] : '',
      email: student.email, mobile_number: student.mobile_number, gender: student.gender, address: student.address
    });
    navigateInstance('/add-student');
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student record? This action cannot be undone.")) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        fetchStudents();
      } catch (err) {
        console.error("Purge failure:", err);
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ name: '', course: '', year: '', date_of_birth: '', email: '', mobile_number: '', gender: '', address: '' });
    setPhoto(null);
    if (document.getElementById('photo-input')) document.getElementById('photo-input').value = '';
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
        <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">STUDENT MANAGEMENT SYSTEM</h1>
              <p className="text-[14px] text-slate-500 font-mono mt-0.5">Efficiently manage and organize student information</p>
            </div>

            <div className="flex gap-4">
              <Link to="/" onClick={resetForm} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200">
                <Users className="w-4 h-4 text-cyan-400" />
                STUDENT LIST
              </Link>
              <Link to="/add-student" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition bg-gradient-to-r from-emerald-500/10 to-teal-600/10 hover:from-emerald-500/20 hover:to-teal-600/20 border border-emerald-500/30 text-emerald-400">
                <UserPlus className="w-4 h-4" />
                REGISTER NEW STUDENT
              </Link>
            </div>
          </div>
        </nav>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
            <div className="text-xs font-bold text-slate-500 tracking-wider">TOTAL ACTIVE STUDENTS</div>
            <div className="text-2xl font-black text-cyan-400 mt-1">{analytics.total_count}</div>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
            <div className="text-xs font-bold text-slate-500 tracking-wider">COURSES</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{analytics.total_courses}</div>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
            <div className="text-xs font-bold text-slate-500 tracking-wider">MALE STUDENTS</div>
            <div className="text-2xl font-black text-blue-400 mt-1">{analytics.male_count}</div>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
            <div className="text-xs font-bold text-slate-500 tracking-wider">FEMALE STUDENTS</div>
            <div className="text-2xl font-black text-pink-400 mt-1">{analytics.female_count}</div>
          </div>
        </div>
        <main className="max-w-7xl mx-auto p-6">
          <Routes>
            <Route path="/" element={
              <div className="space-y-4">
                <SearchBar search={search} setSearch={setSearch} courseFilter={courseFilter} setCourseFilter={setCourseFilter} setPage={setPage} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {students.length > 0 ? (
                    students.map(student => (
                      <RouteContextWrapper key={student.admission_number} student={student} handleEditInit={handleEditInit} handleDelete={handleDelete} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-16 text-slate-500 text-sm font-semibold border-2 border-dashed border-slate-800 rounded-xl bg-slate-800/20">
                      <p>No student records found matching the current search and filter criteria.</p>
                    </div>
                  )}
                </div>

                <Pagination page={page} setPage={setPage} totalPages={totalPages} />
              </div>
            } />

            <Route path="/add-student" element={
              <div className="max-w-xl mx-auto">
                <FormContextWrapper formData={formData} setFormData={setFormData} setPhoto={setPhoto} handleSubmit={handleSubmit} editingId={editingId} resetForm={resetForm} />
              </div>
            } />

          </Routes>
        </main>
      </div>
    </Router>

  );
}



function RouteContextWrapper({ student, handleEditInit, handleDelete }) {
  const navigate = useNavigate();
  return <StudentCard student={student} handleEditInit={(data) => handleEditInit(data, navigate)} handleDelete={handleDelete} />;
}

function FormContextWrapper({ formData, setFormData, setPhoto, handleSubmit, editingId, resetForm }) {
  const navigate = useNavigate();
  return (
    <StudentForm
      formData={formData} setFormData={setFormData} setPhoto={setPhoto}
      handleSubmit={(e) => { e.preventDefault(); handleSubmit(navigate); }}
      editingId={editingId}
      resetForm={() => { resetForm(); navigate('/'); }}
    />
  );
}