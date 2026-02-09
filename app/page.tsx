"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "./components/ui/Card";

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const goToPage = (role: string) => {
    router.push(`/${role}`);
  };

  const roles = [
    {
      id: "student",
      title: "Student",
      description: "Access your sessions and feedback",
      icon: "🎓",
      path: "student/login"
    },
    {
      id: "staff",
      title: "Staff",
      description: "Manage mentoring sessions",
      icon: "👨‍🏫",
      path: "staff/login"
    },
    {
      id: "admin",
      title: "Admin",
      description: "System management & controls",
      icon: "🛡️",
      path: "admin/dashboard"
    }
  ];

  return (
    <div className="min-h-screen w-full flex bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-accent/20 rounded-full blur-[120px]" />
      </div>

      <div className="w-full h-full flex flex-col lg:flex-row z-10">

        <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center relative">
          <div className="max-w-xl mx-auto lg:mx-0 w-full">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-display font-bold text-xl tracking-wider text-slate-800">MENTOR SYNC</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold font-display text-slate-800 mb-6 leading-tight">
              Hello,<br />welcome!
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-md leading-relaxed">
              Select your role to access your personalized dashboard and unlock your full potential in our mentoring platform.
            </p>

          </div>
        </div>

        <div className="flex-1 p-4 lg:p-8 flex items-center justify-center">
          <div className="w-full max-w-md">
            <Card glass className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Select Your Role</h2>
                <p className="text-slate-500 text-sm">Choose the option that best describes you</p>
              </div>

              <div className="space-y-4 mb-8">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-4 group
                      ${selectedRole === role.id
                        ? 'bg-blue-50 border-blue-500 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-colors
                      ${selectedRole === role.id ? 'bg-blue-500/20' : 'bg-slate-100'}`}>
                      {role.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold transition-colors ${selectedRole === role.id ? 'text-blue-600' : 'text-slate-700 group-hover:text-slate-900'}`}>
                        {role.title}
                      </h3>
                      <p className="text-xs text-slate-500 group-hover:text-slate-600">{role.description}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${selectedRole === role.id ? 'border-blue-500' : 'border-slate-600'}`}>
                      {selectedRole === role.id && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
                    </div>
                  </button>
                ))}
              </div>

              <button
                disabled={!selectedRole}
                onClick={() => {
                  if (selectedRole) {
                    const role = roles.find(r => r.id === selectedRole);
                    if (role) goToPage(role.path);
                  }
                }}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300
                  ${selectedRole
                    ? 'bg-gradient-to-r from-blue-600 to-violet-600 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02]'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
              >
                Continue to Dashboard
              </button>

            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}