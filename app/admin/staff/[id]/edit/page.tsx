'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditStaff() {
  const router = useRouter();
  const params = useParams();
  const staffId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ staffname: '', emailaddress: '', mobileno: '' });

  useEffect(() => {
    fetch(`/api/staff/${staffId}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => setFormData({ staffname: data.staffname || '', emailaddress: data.emailaddress || '', mobileno: data.mobileno || '' }))
      .catch(() => setError('Failed to load staff details.'))
      .finally(() => setLoading(false));
  }, [staffId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true); setError('');
    try {
      const res = await fetch('/api/staff/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staffid: staffId, ...formData }),
      });
      if (!res.ok) throw new Error();
      router.push('/admin/staff');
      router.refresh();
    } catch {
      setError('Failed to update staff details. Please try again.');
    } finally { setSubmitting(false); }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#EFF6FF] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#EFF6FF] font-sans relative selection:bg-blue-100 selection:text-blue-900 pb-16">
      <div className="absolute top-0 w-full h-96 bg-gradient-to-b from-blue-100/40 via-blue-50/20 to-transparent z-0 pointer-events-none blur-3xl" />
      
      <header className="bg-white/70 backdrop-blur-xl border-b border-white/50 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-4">
          <Link href="/admin/staff" className="p-2 bg-white/50 hover:bg-white text-gray-500 hover:text-blue-600 rounded-xl transition-all shadow-sm border border-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Edit Mentor</h1>
            <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mt-0.5">Update mentor profile information</p>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-6 py-12 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 lg:p-10 relative overflow-hidden transition-all group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-8 border border-white shadow-sm">
             <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50/80 backdrop-blur-sm border border-red-100 text-red-700 text-sm font-medium rounded-xl flex items-start gap-3">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label htmlFor="staffname" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Mentor Name <span className="text-red-500">*</span>
              </label>
              <input id="staffname" name="staffname" type="text" required
                value={formData.staffname} onChange={handleChange}
                placeholder="e.g. Dr. Ramesh Patel"
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white transition-all shadow-sm font-medium"
              />
            </div>

            <div>
              <label htmlFor="emailaddress" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
              <input id="emailaddress" name="emailaddress" type="email"
                value={formData.emailaddress} onChange={handleChange}
                placeholder="e.g. ramesh.patel@college.edu"
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white transition-all shadow-sm font-medium"
              />
            </div>

            <div>
              <label htmlFor="mobileno" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mobile Number</label>
              <input id="mobileno" name="mobileno" type="text"
                value={formData.mobileno} onChange={handleChange}
                placeholder="e.g. 9876543210"
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white transition-all shadow-sm font-medium"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Link href="/admin/staff"
                className="flex-1 py-3 text-center bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-50 shadow-sm transition-all focus:ring-2 focus:ring-gray-200">
                Cancel
              </Link>
              <button type="submit" disabled={submitting}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-400 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex justify-center items-center gap-2">
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Saving...
                  </>
                ) : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
