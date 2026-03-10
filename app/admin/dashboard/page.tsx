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
    <div className="min-h-screen bg-slate-50 font-sans relative">
      <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-blue-100/50 to-transparent z-0 pointer-events-none" />
      {/* Top bar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">{greeting}, Admin</p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Log Out
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8 relative z-10">

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full translate-x-10 -translate-y-10 group-hover:bg-blue-100 transition-colors" />
            <p className="text-sm text-gray-500 mb-1 relative z-10">Total Staff</p>
            <p className="text-4xl font-bold text-blue-600 relative z-10">
              {staffCount === null ? "—" : staffCount}
            </p>
          </div>
          <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full translate-x-10 -translate-y-10 group-hover:bg-green-100 transition-colors" />
            <p className="text-sm text-gray-500 mb-1 relative z-10">Total Students</p>
            <p className="text-4xl font-bold text-green-600 relative z-10">
              {studentCount === null ? "—" : studentCount}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-base font-bold text-gray-700 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/admin/staff/add" className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm hover:border-blue-400 hover:shadow-md transition-all group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Add New Staff</p>
                <p className="text-xs text-gray-500 mt-0.5">Register a new mentor</p>
              </div>
            </Link>
            <Link href="/admin/student/add" className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm hover:border-green-400 hover:shadow-md transition-all group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Add New Student</p>
                <p className="text-xs text-gray-500 mt-0.5">Enroll a new student</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Management */}
        <div>
          <h2 className="text-base font-bold text-gray-700 mb-3">Management</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/admin/staff" className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:border-blue-400 hover:shadow-md transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Manage Staff</p>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">Add, edit, manage mentor profiles</p>
            </Link>
            <Link href="/admin/student" className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:border-green-400 hover:shadow-md transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <p className="font-bold text-gray-800 group-hover:text-green-600 transition-colors">Manage Students</p>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">View, add, and edit student records</p>
            </Link>
            <Link href="/admin/studentmentor" className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:border-orange-400 hover:shadow-md transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors">Mentor Assignments</p>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">View student-mentor relationships</p>
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
