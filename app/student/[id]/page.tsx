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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="bg-white border border-red-100 rounded-xl p-8 text-center max-w-sm w-full shadow-lg">
          <p className="text-red-500 font-bold mb-4 text-xl">Invalid Student ID</p>
          <Link href="/student/login" className="inline-block bg-red-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
            Go to Login
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
      <div className="min-h-screen bg-[#F8FAFC] font-sans">
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <h1 className="text-xl font-bold text-gray-800">My Mentoring Details</h1>
          <Link href="/student/login" className="px-4 py-2 text-sm font-bold text-red-500 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors">
            Logout
          </Link>
        </header>
        <main className="max-w-2xl mx-auto px-6 py-16 text-center">
          <div className="bg-white border border-gray-100 rounded-2xl p-10 shadow-md">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">No Session Record Yet</h2>
            <p className="text-gray-500">Your mentor has not logged a session. Check back soon.</p>
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
      case "Low": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Medium": return "bg-amber-100 text-amber-700 border-amber-200";
      case "High": return "bg-rose-100 text-rose-700 border-rose-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const learnerColor = (type: string | null) => {
    switch (type) {
      case "Fast": return "bg-violet-100 text-violet-700 border-violet-200";
      case "Average": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Slow": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Advanced": return "bg-pink-100 text-pink-700 border-pink-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-12">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-md">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Mentoring Session Log</h1>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {data.studentmentor.student.studentname}
            </p>
          </div>
        </div>
        <Link href="/student/login" className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-rose-500 bg-rose-50 border border-rose-100 rounded-lg hover:bg-rose-100 transition-colors shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
          Logout
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8 space-y-6">

        {/* Header Summary */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6 md:items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
               </div>
               <div>
                 <p className="text-sm font-medium text-gray-500">Student Profile</p>
                 <p className="text-xl font-bold text-gray-800">{data.studentmentor.student.studentname}</p>
                 <p className="text-sm font-mono text-blue-600 mt-0.5">{data.studentmentor.student.enrollmentno}</p>
               </div>
            </div>

            <div className="h-px w-full md:w-px md:h-12 bg-gray-200 hidden md:block"></div>

            <div className="flex items-center gap-4">
               <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
               </div>
               <div>
                 <p className="text-sm font-medium text-gray-500">Assigned Mentor</p>
                 <p className="text-xl font-bold text-gray-800">{data.studentmentor.staff.staffname}</p>
                 <p className="text-sm text-gray-500 mt-0.5">{data.studentmentor.staff.emailaddress}</p>
               </div>
            </div>
        </section>

        {/* Date and Discussion block */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <section className="bg-emerald-50 rounded-2xl shadow-sm border border-emerald-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <h2 className="text-sm font-bold text-emerald-800 uppercase tracking-widest">Session Date</h2>
              </div>
              <p className="text-2xl font-bold text-emerald-900">{formatDate(data.dateofmentoring)}</p>
            </section>

             <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                 Analytics
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-sm font-semibold text-gray-600">Stress Level</span>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${stressColor(data.stresslevel)}`}>
                    {data.stresslevel || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-sm font-semibold text-gray-600">Learner Type</span>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${learnerColor(data.learnertype)}`}>
                    {data.learnertype || "—"}
                  </span>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
              <h2 className="text-sm font-bold text-indigo-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                Discussion Details
              </h2>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Meeting Agenda</p>
                  <p className="text-gray-800 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 text-sm leading-relaxed">
                    {data.mentoringmeetingagenda || <span className="text-gray-400 italic">Not set</span>}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Issues Discussed</p>
                  <p className="text-gray-800 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 text-sm leading-relaxed">
                    {data.issuesdiscussed || <span className="text-gray-400 italic">No notes recorded</span>}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Feedback Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
           <h2 className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
              Feedback & Opinions
           </h2>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
               <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Student's Opinion</p>
               <p className="text-gray-800 bg-amber-50/30 p-4 rounded-xl border border-amber-100/50 text-sm min-h-[5rem] leading-relaxed">
                 {data.studentsopinion || <span className="text-gray-400 italic">None provided</span>}
               </p>
             </div>
             <div>
               <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Staff's Assessment</p>
               <p className="text-gray-800 bg-amber-50/30 p-4 rounded-xl border border-amber-100/50 text-sm min-h-[5rem] leading-relaxed">
                 {data.staffopinion || <span className="text-gray-400 italic">None provided</span>}
               </p>
             </div>
           </div>
        </section>

        {/* Parent Details */}
        <section className="bg-pink-50/50 rounded-2xl shadow-sm border border-pink-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-sm font-bold text-pink-500 uppercase tracking-widest flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              Parent Involvement
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600">Was parent present?</span>
              <span className={`px-3 py-1 rounded-md text-xs font-bold border ${data.isparentpresent ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-white text-gray-500 border-gray-200"}`}>
                {data.isparentpresent ? "Yes" : "No"}
              </span>
            </div>
          </div>

          {data.isparentpresent && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-white p-5 rounded-xl border border-pink-100">
              <div>
                <p className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-1">Parent Name</p>
                <p className="text-gray-900 font-medium">{data.parentname || "—"}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-1">Parent Mobile</p>
                <p className="text-gray-900 font-medium">{data.parentmobileno || "—"}</p>
              </div>
              <div className="md:col-span-3 sm:col-span-2">
                <p className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-2">Parent's Opinion</p>
                <p className="text-gray-800 text-sm bg-pink-50/30 p-3 rounded-lg border border-pink-100">{data.parentsopinion || "—"}</p>
              </div>
            </div>
          )}
        </section>

        {data.modified && (
          <p className="text-xs font-medium text-gray-400 text-center uppercase tracking-wider pt-2">
            Last updated: {new Date(data.modified).toLocaleString("en-US")}
          </p>
        )}
      </main>
    </div>
  );
}
