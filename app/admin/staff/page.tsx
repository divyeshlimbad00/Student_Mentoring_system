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
    <div className="min-h-screen bg-slate-50 font-sans relative">
      <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-blue-100/50 to-transparent z-0 pointer-events-none" />
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Staff &amp; Mentors</h1>
          <p className="text-sm text-gray-500">Manage academic staff and mentorship assignments</p>
        </div>
        <Link
          href="/admin/staff/add"
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all hover:-translate-y-0.5"
        >
          + Add Mentor
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-6 space-y-5 relative z-10">
        {/* Search + Back */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, ID or email..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm transition-all"
            />
          </div>
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-sm text-gray-500 hover:text-gray-700 underline">
              Clear
            </button>
          )}
          <Link href="/admin/dashboard" className="ml-auto text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-5 py-4 w-12 rounded-tl-lg">#</th>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Mobile</th>
                  <th className="px-5 py-4">Joined</th>
                  <th className="px-5 py-4 text-center rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-400">Loading...</td></tr>
                ) : filteredStaff.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-gray-400">
                      {searchQuery ? 'No staff found for your search.' : 'No staff members added yet.'}
                      {!searchQuery && (
                        <div className="mt-2">
                          <Link href="/admin/staff/add" className="text-blue-600 hover:underline text-sm">Add one now</Link>
                        </div>
                      )}
                    </td>
                  </tr>
                ) : filteredStaff.map((s, i) => (
                  <tr key={s.staffid} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 text-gray-400">{i + 1}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                          {s.staffname.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{s.staffname}</p>
                          <p className="text-xs text-gray-400">ID: {s.staffid}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{s.emailaddress || <span className="text-gray-300 italic">—</span>}</td>
                    <td className="px-5 py-3 text-gray-600">{s.mobileno || <span className="text-gray-300 italic">—</span>}</td>
                    <td className="px-5 py-3 text-gray-500">
                      {s.created ? new Date(s.created).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/admin/staff/${s.staffid}/edit`} className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded hover:bg-blue-100 transition-colors">
                          Edit
                        </Link>
                        <button
                          onClick={() => setDeleteConfirm({ id: s.staffid, name: s.staffname })}
                          className="px-3 py-1 text-xs font-medium bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500">
            Showing <strong>{filteredStaff.length}</strong> of <strong>{staff.length}</strong> staff members
          </div>
        </div>
      </main>

      {/* Delete Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Staff Member?</h3>
            <p className="text-sm text-gray-500 mb-5">
              Are you sure you want to delete <strong>{deleteConfirm.name}</strong>? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} disabled={deleting} className="flex-1 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-60">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={deleting} className="flex-1 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors disabled:opacity-60">
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
