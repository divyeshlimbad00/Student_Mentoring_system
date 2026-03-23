import { prisma } from "@/lib/prisma";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DetailUser({ params }: Props) {
  const { id } = await params;
  const studentId = Number(id);

  if (isNaN(studentId)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center font-sans">
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-10 text-center max-w-sm w-full shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <p className="text-red-500 font-bold mb-6 text-xl">Invalid Student ID</p>
          <Link href="/student/login" className="inline-flex items-center justify-center w-full bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-red-600 hover:to-rose-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  const data = await prisma.studentmentoring.findFirst({
    where: { studentmentor: { studentid: studentId } },
    include: {
      studentmentor: {
        include: { student: true, staff: true },
      },
    },
    orderBy: { studentmentoringid: "desc" },
  });

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF] font-sans selection:bg-blue-100 selection:text-blue-900">
        <header className="bg-white/70 backdrop-blur-lg border-b border-white/50 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">My Mentoring Details</h1>
          <Link href="/student/login" className="px-5 py-2.5 text-sm font-bold text-red-600 bg-red-50/50 border border-red-100/50 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all shadow-sm">
            Logout
          </Link>
        </header>
        <main className="max-w-2xl mx-auto px-6 py-24 text-center">
          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transform transition-all hover:scale-[1.01]">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-4 ring-white">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-3">No Session Record Yet</h2>
            <p className="text-gray-500 text-lg">Your mentor has not logged a session. Check back soon.</p>
          </div>
        </main>
      </div>
    );
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
  };

  const stressColor = (level: string | null) => {
    switch (level) {
      case "Low": return "bg-emerald-50 text-emerald-700 border-emerald-200/60 shadow-[0_0_10px_rgba(16,185,129,0.1)]";
      case "Medium": return "bg-amber-50 text-amber-700 border-amber-200/60 shadow-[0_0_10px_rgba(245,158,11,0.1)]";
      case "High": return "bg-rose-50 text-rose-700 border-rose-200/60 shadow-[0_0_10px_rgba(244,63,94,0.1)]";
      default: return "bg-gray-50 text-gray-600 border-gray-200/60";
    }
  };

  const learnerColor = (type: string | null) => {
    switch (type) {
      case "Fast": return "bg-violet-50 text-violet-700 border-violet-200/60 shadow-[0_0_10px_rgba(139,92,246,0.1)]";
      case "Average": return "bg-blue-50 text-blue-700 border-blue-200/60 shadow-[0_0_10px_rgba(59,130,246,0.1)]";
      case "Slow": return "bg-orange-50 text-orange-700 border-orange-200/60 shadow-[0_0_10px_rgba(249,115,22,0.1)]";
      case "Advanced": return "bg-pink-50 text-pink-700 border-pink-200/60 shadow-[0_0_10px_rgba(236,72,153,0.1)]";
      default: return "bg-gray-50 text-gray-600 border-gray-200/60";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#EFF6FF] font-sans pb-16 selection:bg-blue-100 selection:text-blue-900">
      <header className="bg-white/70 backdrop-blur-xl border-b border-white/50 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 transform transition-transform hover:scale-105">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <div>
            <h1 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Mentoring Session Log</h1>
            <p className="text-xs font-bold text-indigo-500 uppercase tracking-wider mt-0.5">
              {data.studentmentor.student.studentname}
            </p>
          </div>
        </div>
        <Link href="/student/login" className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-rose-600 bg-white border border-rose-100 rounded-xl hover:bg-rose-50 hover:border-rose-200 transition-all shadow-sm hover:shadow transform hover:-translate-y-0.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
          Logout
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8 space-y-8">

        {/* Header Summary */}
        <section className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-8 flex flex-col md:flex-row gap-8 md:items-center justify-between relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center gap-5">
               <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100/50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner ring-4 ring-white">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
               </div>
               <div>
                 <p className="text-sm font-bold text-blue-500/80 uppercase tracking-widest mb-1">Student Profile</p>
                 <p className="text-2xl font-extrabold text-gray-900">{data.studentmentor.student.studentname}</p>
                 <p className="text-sm font-semibold font-mono text-gray-500 mt-1 bg-gray-100/80 px-2 py-0.5 rounded-md inline-block">{data.studentmentor.student.enrollmentno}</p>
               </div>
            </div>

            <div className="h-px w-full md:w-px md:h-16 bg-gradient-to-b from-transparent via-gray-200 to-transparent hidden md:block"></div>

            <div className="flex items-center gap-5">
               <div className="w-20 h-20 bg-gradient-to-br from-indigo-50 to-indigo-100/50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner ring-4 ring-white">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
               </div>
               <div>
                 <p className="text-sm font-bold text-indigo-500/80 uppercase tracking-widest mb-1">Assigned Mentor</p>
                 <p className="text-2xl font-extrabold text-gray-900">{data.studentmentor.staff.staffname}</p>
                 <p className="text-sm font-medium text-gray-500 mt-1">{data.studentmentor.staff.emailaddress}</p>
               </div>
            </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            <section className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-lg shadow-emerald-500/20 p-8 text-white relative overflow-hidden transform transition-all hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <h2 className="text-sm font-bold text-emerald-50 uppercase tracking-widest">Session Date</h2>
                </div>
                <p className="text-3xl font-extrabold text-white">{formatDate(data.dateofmentoring)}</p>
              </div>
            </section>

             <section className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-3">
                 <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                 </div>
                 Analytics
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-sm font-bold text-gray-600">Stress Level</span>
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-extrabold border uppercase tracking-wider ${stressColor(data.stresslevel)}`}>
                    {data.stresslevel || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-sm font-bold text-gray-600">Learner Type</span>
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-extrabold border uppercase tracking-wider ${learnerColor(data.learnertype)}`}>
                    {data.learnertype || "—"}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-8 h-full hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
              <h2 className="text-sm font-bold text-indigo-500 uppercase tracking-widest mb-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                   <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                </div>
                Discussion Details
              </h2>
              
              <div className="space-y-8">
                <div className="group">
                  <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    Meeting Agenda
                  </p>
                  <div className="text-gray-800 bg-gradient-to-br from-indigo-50/50 to-white p-6 rounded-2xl border border-indigo-100/60 text-sm leading-relaxed shadow-sm group-hover:shadow-md transition-shadow">
                    {data.mentoringmeetingagenda || <span className="text-gray-400 italic">Not set</span>}
                  </div>
                </div>
                <div className="group">
                  <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    Issues Discussed
                  </p>
                  <div className="text-gray-800 bg-gradient-to-br from-indigo-50/50 to-white p-6 rounded-2xl border border-indigo-100/60 text-sm leading-relaxed shadow-sm group-hover:shadow-md transition-shadow">
                    {data.issuesdiscussed || <span className="text-gray-400 italic">No notes recorded</span>}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Feedback Section */}
        <section className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
           <h2 className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-8 flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                 <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
              </div>
              Feedback & Opinions
           </h2>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="group">
               <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                 Student's Opinion
               </p>
               <div className="text-gray-800 bg-gradient-to-br from-amber-50/40 to-white p-6 rounded-2xl border border-amber-100/50 text-sm min-h-[6rem] leading-relaxed shadow-sm group-hover:shadow-md transition-shadow">
                 {data.studentsopinion || <span className="text-gray-400 italic">None provided</span>}
               </div>
             </div>
             <div className="group">
               <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                 Staff's Assessment
               </p>
               <div className="text-gray-800 bg-gradient-to-br from-amber-50/40 to-white p-6 rounded-2xl border border-amber-100/50 text-sm min-h-[6rem] leading-relaxed shadow-sm group-hover:shadow-md transition-shadow">
                 {data.staffopinion || <span className="text-gray-400 italic">None provided</span>}
               </div>
             </div>
           </div>
        </section>

        {/* Parent Details */}
        <section className="bg-gradient-to-br from-pink-50/80 to-rose-50/50 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-8 relative overflow-hidden hover:shadow-[0_8px_30px_rgb(236,72,153,0.08)] transition-all">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full blur-3xl -z-10 opacity-40"></div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <h2 className="text-sm font-bold text-pink-500 uppercase tracking-widest flex items-center gap-3">
              <div className="w-8 h-8 bg-pink-100/50 rounded-lg flex items-center justify-center">
                 <svg className="w-4 h-4 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              Parent Involvement
            </h2>
            <div className="flex items-center gap-3 bg-white/60 p-1.5 rounded-xl border border-white backdrop-blur-sm shadow-sm">
              <span className="text-sm font-bold text-gray-600 px-2">Was parent present?</span>
              <span className={`px-4 py-1.5 rounded-lg text-xs font-extrabold shadow-sm border uppercase tracking-wider ${data.isparentpresent ? "bg-emerald-500 text-white border-emerald-600" : "bg-gray-100 text-gray-500 border-gray-200"}`}>
                {data.isparentpresent ? "Yes" : "No"}
              </span>
            </div>
          </div>

          {data.isparentpresent && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-pink-100/50 shadow-sm">
              <div className="space-y-1">
                <p className="text-xs font-extrabold text-pink-400 uppercase tracking-wider">Parent Name</p>
                <p className="text-gray-900 font-bold text-lg">{data.parentname || "—"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-extrabold text-pink-400 uppercase tracking-wider">Parent Mobile</p>
                <p className="text-gray-900 font-bold text-lg">{data.parentmobileno || "—"}</p>
              </div>
              <div className="md:col-span-3 sm:col-span-2 mt-2 group">
                <p className="text-xs font-extrabold text-pink-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                  Parent's Opinion
                </p>
                <div className="text-gray-800 text-sm bg-gradient-to-br from-pink-50/40 to-white p-5 rounded-xl border border-pink-100/50 leading-relaxed shadow-sm transition-shadow group-hover:shadow-md">{data.parentsopinion || "—"}</div>
              </div>
            </div>
          )}
        </section>

        {data.modified && (
          <p className="text-xs font-bold text-gray-400 text-center uppercase tracking-widest pt-4 flex items-center justify-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Last updated: {new Date(data.modified).toLocaleString("en-US")}
          </p>
        )}
      </main>
    </div>
  );
}

