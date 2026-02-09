import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function StudentMentorList() {
  const data = await prisma.studentmentor.findMany({
    include: {
      student: true,
      staff: true,
    },
    orderBy: { created: 'desc' }
  });

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Mentorship Allocations
            </h1>
            <p className="text-slate-500 mt-2 text-lg">
              Manage student-mentor assignments and relationships.
            </p>
          </div>

          <Link
            href="/admin/allocate"
            className="group relative inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span className="mr-2 text-xl">+</span> Allocate New
          </Link>
        </div>

        {/* Content Section */}
        <div className="glass-card overflow-hidden backdrop-blur-xl bg-white/80 border border-slate-200/60 shadow-xl rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="px-6 py-5 text-center w-16">#</th>
                  <th className="px-6 py-5">Student</th>
                  <th className="px-6 py-5">Assigned Mentor</th>
                  <th className="px-6 py-5 text-center">Status</th>
                  <th className="px-6 py-5 text-right">Assigned Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-4xl">
                          🔗
                        </div>
                        <h3 className="text-xl font-medium text-slate-900">No mappings found</h3>
                        <p className="text-slate-500 max-w-sm">
                          There are currently no active student-mentor allocations.
                        </p>
                        <Link
                          href="/admin/allocate"
                          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Allocate Now
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data.map((d, i) => (
                    <tr
                      key={d.studentmentorid}
                      className="group hover:bg-blue-50/50 transition-colors duration-200"
                    >
                      <td className="px-6 py-5 text-center text-slate-400 font-medium">
                        {i + 1}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold shadow-sm">
                            {d.student.studentname.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-base font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                              {d.student.studentname}
                            </p>
                            <span className="text-xs text-slate-400">
                              Student
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold shadow-sm">
                            {d.staff.staffname.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-base font-semibold text-slate-900">
                              {d.staff.staffname}
                            </p>
                            <span className="text-xs text-slate-400">
                              Mentor
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200/60">
                          Assigned
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right text-sm text-slate-500 tab-nums">
                        {d.created ? new Date(d.created).toLocaleDateString('en-US', {
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
              Showing <span className="font-medium text-slate-900">{data.length}</span> allocations
            </p>
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
