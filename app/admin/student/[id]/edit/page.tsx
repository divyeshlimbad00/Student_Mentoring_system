'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditStudent() {
  const router = useRouter();
  const params = useParams();
  const studentId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ studentname: '', enrollmentno: '', emailaddress: '', password: '', mobileno: '' });

  useEffect(() => {
    fetch(`/api/student/${studentId}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => setFormData({
        studentname: data.studentname || '',
        enrollmentno: data.enrollmentno || '',
        emailaddress: data.emailaddress || '',
        password: data.password || '',
        mobileno: data.mobileno || '',
      }))
      .catch(() => setError('Failed to load student details.'))
      .finally(() => setLoading(false));
  }, [studentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true); setError('');
    try {
      const res = await fetch('/api/student/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentid: studentId, ...formData }),
      });
      if (!res.ok) throw new Error();
      router.push('/admin/student');
      router.refresh();
    } catch {
      setError('Failed to update student details. Please try again.');
    } finally { setSubmitting(false); }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative">
      <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-green-100/50 to-transparent z-0 pointer-events-none" />
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 sticky top-0 z-20 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">Edit Student</h1>
        <p className="text-sm text-gray-500">Update student profile information</p>
      </header>

      <main className="max-w-lg mx-auto px-6 py-8 relative z-10">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 lg:p-8 hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50/50 rounded-full translate-x-12 -translate-y-12 z-0" />
          {error && (
            <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="studentname" className="block text-sm font-medium text-gray-700 mb-1">
                Student Name <span className="text-red-500">*</span>
              </label>
              <input id="studentname" name="studentname" type="text" required
                value={formData.studentname} onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="enrollmentno" className="block text-sm font-medium text-gray-700 mb-1">
                Enrollment Number <span className="text-red-500">*</span>
              </label>
              <input id="enrollmentno" name="enrollmentno" type="text" required
                value={formData.enrollmentno} onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="emailaddress" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input id="emailaddress" name="emailaddress" type="email"
                value={formData.emailaddress} onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input id="password" name="password" type="text" required
                value={formData.password} onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="mobileno" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input id="mobileno" name="mobileno" type="text"
                value={formData.mobileno} onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={submitting}
                className="flex-1 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-green-400 disabled:to-emerald-400 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow hover:-translate-y-0.5 transition-all disabled:cursor-not-allowed">
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
              <Link href="/admin/student"
                className="flex-1 py-2.5 text-center border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
