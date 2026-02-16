"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [greeting, setGreeting] = useState("Welcome");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const managementItems = [
    {
      title: "Manage Staff",
      description: "Add, edit, and manage mentor profiles",
      icon: "👨‍🏫",
      link: "/admin/staff",
      badge: "Staff",
      accent: "from-blue-500 to-blue-600",
      light: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      title: "Manage Students",
      description: "View, add, and edit student records",
      icon: "🎓",
      link: "/admin/student",
      badge: "Students",
      accent: "from-green-500 to-green-600",
      light: "bg-green-50 text-green-700 border-green-200"
    },
    {
      title: "Mentor Assignments",
      description: "View student-mentor relationships",
      icon: "📋",
      link: "/admin/studentmentor",
      badge: "Assignments",
      accent: "from-orange-500 to-orange-600",
      light: "bg-orange-50 text-orange-700 border-orange-200"
    }
  ];

  const quickActions = [
    { title: "Add New Staff", icon: "➕", link: "/admin/staff/add", color: "blue" },
    { title: "Add New Student", icon: "➕", link: "/admin/student/add", color: "green" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="border-b border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 break-words">
                  {greeting} 👋
                </h1>
                <p className="text-slate-600 mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">
                  Manage your mentorship program with ease
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 whitespace-nowrap flex-shrink-0"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Log Out</span>
                <span className="sm:hidden">Exit</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 space-y-12">

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">⚡</span> Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.link}>
                  <div className="group cursor-pointer p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{action.icon}</div>
                      <div>
                        <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {action.title}
                        </p>
                        <p className="text-xs text-slate-500">Click to proceed</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Management Section */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">📊</span> Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {managementItems.map((item, index) => (
                <Link href={item.link} key={index} className="block group">
                  <div className="h-full bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:border-blue-300">
                    {/* Gradient Header */}
                    <div className={`h-24 bg-gradient-to-br ${item.accent} opacity-90 relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-2 right-2 text-4xl transform group-hover:scale-110 transition-transform group-hover:rotate-12">
                          {item.icon}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${item.light}`}>
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all gap-1">
                        <span>View</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
