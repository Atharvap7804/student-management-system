import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, setPage, totalPages }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 pt-4">
      <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-2 rounded bg-slate-800 border border-slate-700 disabled:opacity-40 hover:bg-slate-700 transition text-slate-200">
        <ChevronLeft className="w-4 h-4" />
      </button>
      <span className="text-xs font-mono text-slate-400">PAGE {page} OF {totalPages}</span>
      <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="p-2 rounded bg-slate-800 border border-slate-700 disabled:opacity-40 hover:bg-slate-700 transition text-slate-200">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}