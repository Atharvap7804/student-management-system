import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ search, setSearch, courseFilter, setCourseFilter, setPage }) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex flex-col md:flex-row gap-4 items-center">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-2.5 text-slate-500 w-4 h-4" />
        <input type="text" placeholder="Search students..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="w-full bg-slate-900 border border-slate-700 rounded pl-9 pr-4 p-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400" />
      </div>
      <div className="w-full md:w-48">
        <input type="text" placeholder="Filter by course..." value={courseFilter} onChange={(e) => { setCourseFilter(e.target.value); setPage(1); }} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400" />
      </div>
    </div>
  );
}