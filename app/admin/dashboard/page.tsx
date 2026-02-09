"use client";
import React from "react";
import { Card } from "../../components/ui/Card";
import Link from "next/link";

export default function AdminDashboard() {
  const menuItems = [
    {
      title: "Manage Mentors",
      description: "Add, edit, and view staff mentors",
      icon: "👨‍🏫",
      link: "/admin/staff",
      color: "bg-blue-500/20 text-blue-400"
    },
    {
      title: "Manage Students",
      description: "View and manage student records",
      icon: "🎓",
      link: "/admin/student",
      color: "bg-green-500/20 text-green-400"
    },
    {
      title: "Allocate Mentor",
      description: "Assign mentors to students",
      icon: "🔗",
      link: "/admin/allocate",
      color: "bg-purple-500/20 text-purple-400"
    },
    {
      title: "Student–Mentor List",
      description: "View students and their mentors",
      icon: "📋",
      link: "/admin/studentmentor",
      color: "bg-orange-500/20 text-orange-400"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-slate-800 mb-2">Admin Dashboard</h1>
            <p className="text-slate-500">Manage mentors, students, and mentoring allocation</p>
          </div>
          <Link
            href="/"
            className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm"
          >
            Log Out
          </Link>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <Link href={item.link} key={index} className="block group">
              <Card hover glass className="h-full flex flex-col items-center text-center p-8 bg-white/50 border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-transform group-hover:scale-110 group-hover:-rotate-3 ${item.color.replace('bg-', 'bg-opacity-10 bg-')}`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
