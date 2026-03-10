import { prisma } from "@/lib/prisma";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function StaffDashboard({ params }: PageProps) {
  const { id } = await params;
  const staffId = Number(id);

  if (isNaN(staffId)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        <p className="text-gray-500">Invalid staff ID.</p>
      </div>
    );
  }

  const allocations = await prisma.studentmentor.findMany({
    where: { staffid: staffId },
    include: { student: true, studentmentoring: true },
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative">
      <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-blue-100/50 to-transparent z-0 pointer-events-none" />
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-800">My Allocated Students</h1>
          <p className="text-sm text-gray-500">Manage your mentoring sessions</p>
        </div>
        <Link
          href="/staff/login"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-6 relative z-10">
        {allocations.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm rounded-lg px-5 py-4">
            No students have been allocated to you yet.
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="px-5 py-4 w-12 rounded-tl-lg">#</th>
                    <th className="px-5 py-4">Student Name</th>
                    <th className="px-5 py-4">Enrollment No.</th>
                    <th className="px-5 py-4">Session Status</th>
                    <th className="px-5 py-4 text-center rounded-tr-lg">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {allocations.map((a, i) => (
                    <tr key={a.studentmentorid} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 text-gray-400">{i + 1}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                            {a.student.studentname.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-800">{a.student.studentname}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs font-mono text-gray-700">
                          {a.student.enrollmentno}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        {a.studentmentoring.length === 0 ? (
                          <span className="px-2.5 py-0.5 bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs rounded-full font-medium">
                            No session yet
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 bg-green-50 text-green-700 border border-green-200 text-xs rounded-full font-medium">
                            Session recorded
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-center">
                        {a.studentmentoring.length === 0 ? (
                          <Link
                            href={`/staff/mentoring/${a.studentmentorid}`}
                            className="px-4 py-1.5 text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-md hover:-translate-y-0.5 transition-all"
                          >
                            Start Session
                          </Link>
                        ) : (
                          <Link
                            href={`/staff/mentoring/${a.studentmentorid}`}
                            className="px-4 py-1.5 text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 hover:shadow-sm transition-all"
                          >
                            Update Session
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500">
              Total: <strong>{allocations.length}</strong> student(s)
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
