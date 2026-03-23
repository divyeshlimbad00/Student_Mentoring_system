"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [greeting, setGreeting] = useState("Welcome");
  const [staffCount, setStaffCount] = useState<number | null>(null);
  const [studentCount, setStudentCount] = useState<number | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  useEffect(() => {
    fetch("/api/staff/get")
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setStaffCount(data.length))
      .catch(() => setStaffCount(0));
    fetch("/api/student/get")
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setStudentCount(data.length))
      .catch(() => setStudentCount(0));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#EFF6FF] font-sans relative selection:bg-blue-100 selection:text-blue-900 pb-16">
      <div className="absolute top-0 w-full h-96 bg-gradient-to-b from-blue-100/40 via-blue-50/20 to-transparent z-0 pointer-events-none blur-3xl" />
      
      {/* Top bar */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-white/50 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div>
          <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Admin Dashboard</h1>
          <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mt-0.5">{greeting}, Admin</p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-red-600 bg-white border border-red-100 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all shadow-sm hover:shadow transform hover:-translate-y-0.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Log Out
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10 relative z-10">

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-4 mb-4 relative z-10">
               <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner ring-4 ring-white">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
               </div>
               <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total Staff</p>
            </div>
            <p className="text-5xl font-extrabold text-blue-600 relative z-10 drop-shadow-sm">
              {staffCount === null ? "—" : staffCount}
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-teal-100 to-teal-50 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-4 mb-4 relative z-10">
               <div className="w-12 h-12 bg-gradient-to-br from-teal-50 to-emerald-50 text-teal-600 rounded-2xl flex items-center justify-center shadow-inner ring-4 ring-white">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
               </div>
               <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total Students</p>
            </div>
            <p className="text-5xl font-extrabold text-teal-600 relative z-10 drop-shadow-sm">
              {studentCount === null ? "—" : studentCount}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-3">
             <div className="w-8 h-8 bg-gray-200/50 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
             </div>
             Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/admin/staff/add" className="flex items-center gap-5 bg-white/80 backdrop-blur-xl border border-white rounded-2xl p-5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all group hover:-translate-y-0.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-inner shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800">Add New Staff</p>
                <p className="text-sm font-medium text-gray-500 mt-0.5">Register a new mentor</p>
              </div>
            </Link>
            <Link href="/admin/student/add" className="flex items-center gap-5 bg-white/80 backdrop-blur-xl border border-white rounded-2xl p-5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all group hover:-translate-y-0.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center shadow-inner shadow-teal-500/30 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800">Add New Student</p>
                <p className="text-sm font-medium text-gray-500 mt-0.5">Enroll a new student</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Management */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-3">
             <div className="w-8 h-8 bg-gray-200/50 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
             </div>
             Management Hub
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/admin/staff" className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:-translate-y-1.5 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-white shadow-inner flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-xl font-extrabold text-gray-800 group-hover:text-blue-600 transition-colors">Manage Staff</p>
              <p className="text-sm font-medium text-gray-500 mt-2 leading-relaxed">Add, edit, manage mentor profiles and academic roles.</p>
            </Link>
            <Link href="/admin/student" className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:-translate-y-1.5 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-white shadow-inner flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <p className="text-xl font-extrabold text-gray-800 group-hover:text-teal-600 transition-colors">Manage Students</p>
              <p className="text-sm font-medium text-gray-500 mt-2 leading-relaxed">View, add, edit, and safely delete student academic records.</p>
            </Link>
            <Link href="/admin/studentmentor" className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:-translate-y-1.5 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-white shadow-inner flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-xl font-extrabold text-gray-800 group-hover:text-orange-500 transition-colors">Mentor Mapping</p>
              <p className="text-sm font-medium text-gray-500 mt-2 leading-relaxed">View and manage relationship assignments between staff and students.</p>
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
