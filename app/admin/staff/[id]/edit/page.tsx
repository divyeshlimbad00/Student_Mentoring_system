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
  const [formData, setFormData] = useState({
    staffname: '',
    emailaddress: '',
    mobileno: '',
  });

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch(`/api/staff/${staffId}`);
        if (!response.ok) throw new Error('Failed to fetch staff');
        const data = await response.json();
        setFormData({
          staffname: data.staffname || '',
          emailaddress: data.emailaddress || '',
          mobileno: data.mobileno || '',
        });
      } catch (err) {
        setError('Failed to load staff details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (staffId) {
      fetchStaff();
    }
  }, [staffId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/staff/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staffid: staffId,
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update staff');
      }

      router.push('/admin/staff');
      router.refresh();
    } catch (err) {
      setError('Failed to update staff details');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Edit Mentor Details
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Update the mentor's profile information.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="glass-card bg-white/80 backdrop-blur-xl py-8 px-4 shadow-xl border border-slate-200/60 sm:rounded-2xl sm:px-10">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="staffname" className="block text-sm font-semibold text-slate-700 mb-1">
                Mentor Name
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-400 sm:text-sm">👤</span>
                </div>
                <input
                  id="staffname"
                  name="staffname"
                  type="text"
                  required
                  value={formData.staffname}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white/50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="e.g. Dr. Emily Carter"
                />
              </div>
            </div>

            <div>
              <label htmlFor="emailaddress" className="block text-sm font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-400 sm:text-sm">✉️</span>
                </div>
                <input
                  id="emailaddress"
                  name="emailaddress"
                  type="email"
                  value={formData.emailaddress}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white/50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="e.g. emily.carter@university.edu"
                />
              </div>
            </div>

            <div>
              <label htmlFor="mobileno" className="block text-sm font-semibold text-slate-700 mb-1">
                Mobile Number
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-400 sm:text-sm">📱</span>
                </div>
                <input
                  id="mobileno"
                  name="mobileno"
                  type="text"
                  value={formData.mobileno}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white/50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="e.g. +1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {submitting ? 'Updating...' : 'Update Mentor'}
              </button>

              <Link
                href="/admin/staff"
                className="w-full text-center py-3 px-4 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
