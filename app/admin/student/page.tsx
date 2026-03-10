'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

export default function StudentList() {
  const [students, setStudents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: number; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch('/api/student/get')
      .then(r => r.json())
      .then(data => { setStudents(data); setFilteredStudents(data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) { setFilteredStudents(students); return; }
    const q = searchQuery.toLowerCase();
    setFilteredStudents(students.filter(s =>
      s.studentname.toLowerCase().includes(q) ||
      s.studentid.toString().includes(q) ||
      s.emailaddress?.toLowerCase().includes(q) ||
      s.enrollmentno?.toLowerCase().includes(q)
    ));
  }, [searchQuery, students]);

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/student/${deleteConfirm.id}`, { method: 'DELETE' });
      if (res.ok) {
        setStudents(prev => prev.filter(s => s.studentid !== deleteConfirm.id));
        setFilteredStudents(prev => prev.filter(s => s.studentid !== deleteConfirm.id));
        setDeleteConfirm(null);
      } else { alert('Failed to delete student'); }
    } catch { alert('Error deleting student'); }
    finally { setDeleting(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative">
      <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-green-100/50 to-transparent z-0 pointer-events-none" />
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Student Directory</h1>
          <p className="text-sm text-gray-500">Manage student profiles and enrollment details</p>
        </div>
        <Link
          href="/admin/student/add"
          className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all hover:-translate-y-0.5"
        >
          + Add Student
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-6 space-y-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, ID, email or enrollment..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm bg-white/80 backdrop-blur-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            />
          </div>
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-sm text-gray-500 hover:text-gray-700 underline">Clear</button>
          )}
          <Link href="/admin/dashboard" className="ml-auto text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-5 py-4 w-12 rounded-tl-lg">#</th>
                  <th className="px-5 py-4">Student</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Mobile</th>
                  <th className="px-5 py-4">Enrollment No.</th>
                  <th className="px-5 py-4">Joined</th>
                  <th className="px-5 py-4 text-center rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan={7} className="px-5 py-10 text-center text-gray-400">Loading...</td></tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-gray-400">
                      {searchQuery ? 'No students found.' : 'No students added yet.'}
                      {!searchQuery && (
                        <div className="mt-2">
                          <Link href="/admin/student/add" className="text-blue-600 hover:underline text-sm">Add one now</Link>
                        </div>
                      )}
                    </td>
                  </tr>
                ) : filteredStudents.map((s, i) => (
                  <tr key={s.studentid} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 text-gray-400">{i + 1}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                          {s.studentname.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{s.studentname}</p>
                          <p className="text-xs text-gray-400">ID: {s.studentid}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{s.emailaddress || <span className="text-gray-300 italic">—</span>}</td>
                    <td className="px-5 py-3 text-gray-600">{s.mobileno || <span className="text-gray-300 italic">—</span>}</td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs font-mono text-gray-700">{s.enrollmentno}</span>
                    </td>
                    <td className="px-5 py-3 text-gray-500">
                      {s.created ? new Date(s.created).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/admin/student/${s.studentid}/edit`} className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded hover:bg-blue-100 transition-colors">
                          Edit
                        </Link>
                        <button
                          onClick={() => setDeleteConfirm({ id: s.studentid, name: s.studentname })}
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
            Showing <strong>{filteredStudents.length}</strong> of <strong>{students.length}</strong> students
          </div>
        </div>
      </main>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Student?</h3>
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
