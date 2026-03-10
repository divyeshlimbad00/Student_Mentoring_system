'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

export default function StudentMentorList() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: number; studentName: string; mentorName: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch('/api/mentoring/get')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/mentoring/${deleteConfirm.id}`, { method: 'DELETE' });
      if (res.ok) {
        setData(prev => prev.filter(d => d.studentmentorid !== deleteConfirm.id));
        setDeleteConfirm(null);
      } else { alert('Failed to delete assignment'); }
    } catch { alert('Error deleting assignment'); }
    finally { setDeleting(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative">
      <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-orange-100/50 to-transparent z-0 pointer-events-none" />
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Mentorship Allocations</h1>
          <p className="text-sm text-gray-500">Manage student-mentor assignments</p>
        </div>
        <Link
          href="/admin/allocate"
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all hover:-translate-y-0.5"
        >
          + Allocate New
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-6 space-y-5 relative z-10">
        <div className="flex justify-end">
          <Link href="/admin/dashboard" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-5 py-4 w-12 rounded-tl-lg">#</th>
                  <th className="px-5 py-4">Student</th>
                  <th className="px-5 py-4">Assigned Mentor</th>
                  <th className="px-5 py-4 text-center">Status</th>
                  <th className="px-5 py-4">Assigned Date</th>
                  <th className="px-5 py-4 text-center rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-400">Loading...</td></tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-gray-400">
                      No mentor allocations found.
                      <div className="mt-2">
                        <Link href="/admin/allocate" className="text-blue-600 hover:underline text-sm">Allocate Now</Link>
                      </div>
                    </td>
                  </tr>
                ) : data.map((d, i) => (
                  <tr key={d.studentmentorid} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 text-gray-400">{i + 1}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                          {d.student.studentname.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{d.student.studentname}</p>
                          <p className="text-xs text-gray-400">Student</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                          {d.staff.staffname.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{d.staff.staffname}</p>
                          <p className="text-xs text-gray-400">Mentor</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className="px-2.5 py-0.5 bg-green-50 text-green-700 border border-green-200 text-xs rounded-full font-medium">
                        Active
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-500">
                      {d.created ? new Date(d.created).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <button
                        onClick={() => setDeleteConfirm({ id: d.studentmentorid, studentName: d.student.studentname, mentorName: d.staff.staffname })}
                        className="px-3 py-1 text-xs font-medium bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100 transition-colors"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500">
            Total: <strong>{data.length}</strong> allocations
          </div>
        </div>
      </main>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Remove Assignment?</h3>
            <p className="text-sm text-gray-500 mb-5">
              Remove <strong>{deleteConfirm.studentName}</strong>&apos;s mentorship with <strong>{deleteConfirm.mentorName}</strong>? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} disabled={deleting} className="flex-1 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-60">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={deleting} className="flex-1 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors disabled:opacity-60">
                {deleting ? 'Removing...' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
