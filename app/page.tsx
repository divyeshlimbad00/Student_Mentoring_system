"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const roles = [
    {
      id: "student",
      title: "Student Portal",
      description: "Access your mentoring sessions, track progress, and provide feedback.",
      path: "/student/login",
      styles: {
        accent: "bg-blue-500",
        iconContainer: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
        textHint: "text-blue-600 group-hover:text-blue-700",
        iconHint: "text-blue-600"
      },
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      )
    },
    {
      id: "staff",
      title: "Staff Portal",
      description: "Manage your assigned students, schedule sessions, and track outcomes.",
      path: "/staff/login",
      styles: {
        accent: "bg-indigo-500",
        iconContainer: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
        textHint: "text-indigo-600 group-hover:text-indigo-700",
        iconHint: "text-indigo-600"
      },
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: "admin",
      title: "Admin Portal",
      description: "Oversee the system, manage users, and monitor overall platform health.",
      path: "/admin/login",
      styles: {
        accent: "bg-slate-700",
        iconContainer: "bg-slate-100 text-slate-700 group-hover:bg-slate-700 group-hover:text-white",
        textHint: "text-slate-700 group-hover:text-slate-800",
        iconHint: "text-slate-700"
      },
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[80%] md:w-[60%] h-[60%] bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[80%] md:w-[60%] h-[60%] bg-indigo-200/40 rounded-full blur-3xl" />
        <div className="absolute top-[20%] right-[20%] w-[40%] h-[40%] bg-purple-200/30 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-5xl z-10 relative">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-md border border-slate-100 mb-4 text-blue-600 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-800 mb-3 tracking-tight">
            Mentor Sync
          </h1>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Your unified platform for academic excellence. Select a portal below to sign in.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => router.push(role.path)}
              className="group relative flex flex-col text-left bg-white/80 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-white shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-slate-200 transition-all duration-500 transform hover:-translate-y-1 overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-1.5 ${role.styles.accent} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out`} />
              
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500
                ${role.styles.iconContainer} shadow-sm group-hover:shadow-md group-hover:scale-110`}
              >
                {role.icon}
              </div>

              <h2 className="text-xl font-bold text-slate-800 mb-2 font-display group-hover:text-slate-900 transition-colors">
                {role.title}
              </h2>
              
              <p className="text-sm text-slate-500 mb-6 flex-grow leading-relaxed group-hover:text-slate-600 transition-colors">
                {role.description}
              </p>

              <div className="flex items-center text-sm font-semibold mt-auto">
                <span className={`transition-colors duration-300 ${role.styles.textHint}`}>
                  Continue as {role.title.split(' ')[0]}
                </span>
                <svg 
                  className={`w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300 ${role.styles.iconHint}`} 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}