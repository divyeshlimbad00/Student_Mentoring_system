'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

export default function StaffList() {
  const [staff, setStaff] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStaff, setFilteredStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: number; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch('/api/staff/get')
      .then(r => r.json())
      .then(data => { setStaff(data); setFilteredStaff(data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) { setFilteredStaff(staff); return; }
    const q = searchQuery.toLowerCase();
    setFilteredStaff(staff.filter(s =>
      s.staffname.toLowerCase().includes(q) ||
      s.staffid.toString().includes(q) ||
      s.emailaddress?.toLowerCase().includes(q)
    ));
  }, [searchQuery, staff]);

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/staff/${deleteConfirm.id}`, { method: 'DELETE' });
      if (res.ok) {
        setStaff(prev => prev.filter(s => s.staffid !== deleteConfirm.id));
        setFilteredStaff(prev => prev.filter(s => s.staffid !== deleteConfirm.id));
        setDeleteConfirm(null);
      } else { alert('Failed to delete staff member'); }
    } catch { alert('Error deleting staff member'); }
    finally { setDeleting(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#EFF6FF] font-sans relative selection:bg-blue-100 selection:text-blue-900 pb-16">
      <div className="absolute top-0 w-full h-96 bg-gradient-to-b from-blue-100/40 via-blue-50/20 to-transparent z-0 pointer-events-none blur-3xl" />
      
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-white/50 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div>
          <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Staff &amp; Mentors</h1>
          <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mt-0.5">Manage academic staff and assignments</p>
        </div>
        <Link
          href="/admin/staff/add"
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
          Add Mentor
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8 relative z-10">
        
        {/* Search + Back */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-80 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name, ID or email..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-white/80 border border-white rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-sm backdrop-blur-xl transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>
          </div>
          
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Dashboard
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-50/80 border-b border-gray-100/80 text-gray-500 text-xs uppercase tracking-widest font-extrabold">
                <tr>
                  <th className="px-6 py-5 rounded-tl-3xl">#</th>
                  <th className="px-6 py-5">Name</th>
                  <th className="px-6 py-5">Email</th>
                  <th className="px-6 py-5">Mobile</th>
                  <th className="px-6 py-5">Joined</th>
                  <th className="px-6 py-5 text-center rounded-tr-3xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/80 text-gray-700">
                {loading ? (
                  <tr><td colSpan={6} className="px-6 py-16 text-center text-gray-400 font-medium">Loading staff records...</td></tr>
                ) : filteredStaff.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                         <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                      <p className="text-gray-500 text-lg font-medium">{searchQuery ? 'No staff found matching your search.' : 'No staff members added yet.'}</p>
                      {!searchQuery && (
                        <div className="mt-3">
                          <Link href="/admin/staff/add" className="inline-block text-blue-600 hover:text-blue-700 font-bold underline">Add your first mentor</Link>
                        </div>
                      )}
                    </td>
                  </tr>
                ) : filteredStaff.map((s, i) => (
                  <tr key={s.staffid} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4 text-gray-400 font-medium">{i + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm border border-white">
                          {s.staffname.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-extrabold text-gray-800 group-hover:text-blue-600 transition-colors">{s.staffname}</p>
                          <p className="text-xs font-mono font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-md mt-1 inline-block">ID: {s.staffid}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{s.emailaddress || <span className="text-gray-300 italic">—</span>}</td>
                    <td className="px-6 py-4 font-medium">{s.mobileno || <span className="text-gray-300 italic">—</span>}</td>
                    <td className="px-6 py-4 text-gray-500 font-medium whitespace-nowrap">
                      {s.created ? new Date(s.created).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/staff/${s.staffid}/edit`} className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-100/50" title="Edit">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </Link>
                        <button
                          onClick={() => setDeleteConfirm({ id: s.staffid, name: s.staffname })}
                          className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100/50" title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-100/80 bg-gray-50/50 text-xs uppercase tracking-widest text-gray-500 font-semibold rounded-b-3xl">
            Showing <span className="text-blue-600 font-extrabold">{filteredStaff.length}</span> of <span className="text-gray-800 font-extrabold">{staff.length}</span> staff members
          </div>
        </div>
      </main>

      {/* Delete Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
          <div className="bg-white/95 backdrop-blur-xl border border-white rounded-3xl shadow-2xl w-full max-w-sm p-8 transform transition-all scale-100">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 border border-red-100 mx-auto">
               <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2 text-center">Delete Staff Member?</h3>
            <p className="text-sm font-medium text-gray-500 mb-8 text-center leading-relaxed">
              Are you sure you want to permanently delete <strong className="text-gray-800">{deleteConfirm.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setDeleteConfirm(null)} 
                disabled={deleting} 
                className="flex-1 py-3 text-sm font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors disabled:opacity-60 shadow-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete} 
                disabled={deleting} 
                className="flex-1 py-3 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors disabled:opacity-60 shadow-lg shadow-red-500/30"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
