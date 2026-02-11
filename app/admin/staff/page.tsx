import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function StaffList() {
  const staff = await prisma.staff.findMany({
    orderBy: { created: 'desc' }
  });

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Staff & Mentors
            </h1>
            <p className="text-slate-500 mt-2 text-lg">
              Manage your academic staff and mentorship assignments.
            </p>
          </div>

          <Link
            href="/admin/staff/add"
            className="group relative inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span className="mr-2 text-xl">+</span> Add New Mentor
          </Link>
        </div>

        {/* Content Section */}
        <div className="glass-card overflow-hidden backdrop-blur-xl bg-white/80 border border-slate-200/60 shadow-xl rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="px-6 py-5 text-center w-16">#</th>
                  <th className="px-6 py-5">Staff Details</th>
                  <th className="px-6 py-5">Contact Info</th>
                  <th className="px-6 py-5 text-right">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {staff.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-3xl">
                          👨‍🏫
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">No staff members found</h3>
                        <p className="text-slate-500 max-w-sm">
                          Get started by adding your first mentor to the system.
                        </p>
                        <Link
                          href="/admin/staff/add"
                          className="mt-4 text-blue-600 font-medium hover:text-blue-700 underline underline-offset-4"
                        >
                          Add Mentor Now
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  staff.map((s, index) => (
                    <tr
                      key={s.staffid}
                      className="group hover:bg-blue-50/50 transition-colors duration-200"
                    >
                      <td className="px-6 py-5 text-center text-slate-400 font-medium">
                        {index + 1}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 flex items-center justify-center text-sm font-bold shadow-sm">
                            {s.staffname.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-base font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                              {s.staffname}
                            </p>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 inline-block mt-1">
                              ID: {s.staffid}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col space-y-1">
                          {s.emailaddress ? (
                            <a href={`mailto:${s.emailaddress}`} className="text-sm text-slate-600 hover:text-blue-600 flex items-center gap-2 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                              {s.emailaddress}
                            </a>
                          ) : (
                            <span className="text-sm text-slate-400 italic">No email</span>
                          )}
                          {s.mobileno && (
                            <span className="text-sm text-slate-500 flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                              {s.mobileno}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right text-sm text-slate-500 tab-nums">
                        {s.created ? new Date(s.created).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) : '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing <span className="font-medium text-slate-900">{staff.length}</span> staff members
            </p>
            <div className="flex gap-2">
              {/* Pagination placeholders - could be implemented later */}
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-4">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
