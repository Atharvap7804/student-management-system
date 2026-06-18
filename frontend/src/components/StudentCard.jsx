import React from 'react';
import { Trash2, Edit2, User } from 'lucide-react';

export default function StudentCard({ student, handleEditInit, handleDelete }) {
  return (
    <div className="bg-slate-800 rounded-xl p-10 border border-slate-700 flex flex-col justify-between hover:border-slate-500 transition shadow-md relative group">
      <span className="absolute top-3 right-3 text-[12px] font-mono tracking-widest text-cyan-400 bg-cyan-950/50 border border-cyan-800/50 px-2 py-0.5 rounded-full">
        ADMIT_ID: #{student.admission_number}
      </span>
      
      <div className="flex gap-4 items-start mb-4">
        <div className="w-25 h-25 rounded-lg bg-slate-900 border border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
          {student.photo_url ? (
            <img src={`https://student-management-system-1fay.onrender.com${student.photo_url}`} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <User className="w-8 h-8 text-slate-600" />
          )}
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-100 tracking-wide">{student.name}</h3>
          <p className="text-md font-semibold text-emerald-400">{student.course} — Batch {student.year}</p>
          <p className="text-[14px] text-slate-400 font-mono">{student.email}</p>
          <p className="text-[14px] text-slate-400 font-mono">📱 {student.mobile_number}</p>
        </div>
      </div>

      <div className="border-t border-slate-700/60 pt-3 flex justify-between items-center mt-auto">
        <p className="text-[12px] text-slate-500">DOB: {new Date(student.date_of_birth).toLocaleDateString()}</p>
        <div className="flex gap-2">
          <button onClick={() => handleEditInit(student)} className="p-1.5 rounded bg-slate-700/50 hover:bg-cyan-500 hover:text-slate-900 text-cyan-400 transition" title="Modify Details">
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => handleDelete(student.admission_number)} className="p-1.5 rounded bg-slate-700/50 hover:bg-rose-500 hover:text-slate-100 text-rose-400 transition" title="Drop Record">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}