import React from 'react';

export default function StudentForm({ formData, setFormData, setPhoto, handleSubmit, editingId, resetForm }) {
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl h-fit">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-slate-700 pb-2 text-emerald-400">
        {editingId ? "UPDATE STUDENT DATA FLOW" : "REGISTER NEW STUDENT RECORD"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">FULL NAME *</label>
          <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-400" placeholder="Enter full name" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">COURSE *</label>
            <input type="text" name="course" required value={formData.course} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-400" placeholder="e.g. B.E. Computer" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">ADMISSION YEAR *</label>
            <input type="number" name="year" required value={formData.year} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-400" placeholder="Year of admission" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">DATE OF BIRTH *</label>
            <input type="date" name="date_of_birth" required value={formData.date_of_birth} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-400" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">GENDER *</label>
            <select name="gender" required value={formData.gender} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-400">
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">EMAIL *</label>
          <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-400" placeholder="Enter valid email address" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">MOBILE *</label>
          <input type="text" name="mobile_number" required value={formData.mobile_number} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-400" placeholder="Enter valid mobile number" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">RESIDENTIAL ADDRESS *</label>
          <textarea name="address" required rows="2" value={formData.address} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-400" placeholder="Enter residential address"></textarea>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">PHOTO *</label>
          <input type="file" id="photo-input" required onChange={(e) => setPhoto(e.target.files[0])} className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-slate-700 file:text-slate-200 hover:file:bg-slate-600 cursor-pointer" />
        </div>

        <div className="flex gap-2 pt-2">
          <button type="submit" className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-900 font-bold p-2.5 rounded text-sm transition shadow-lg">
            {editingId ? "EDIT STUDENT RECORD" : "SAVE STUDENT RECORD"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="bg-slate-700 hover:bg-slate-600 p-2.5 rounded text-sm font-semibold text-slate-200 transition">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}