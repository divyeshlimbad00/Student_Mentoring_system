import { prisma } from "@/lib/prisma";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function StaffDashboard({ params }: PageProps) {
  // ✅ MUST await params in Next.js 15
  const { id } = await params;
  const staffId = Number(id);

  if (isNaN(staffId)) {
    return <div className="container mt-5">Invalid staff ID</div>;
  }

  const allocations = await prisma.studentmentor.findMany({
    where: {
      staffid: staffId, // ✅ now valid Int
    },
    include: {
      student: true,
      studentmentoring: true,
    },
  });

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display text-slate-800">My Allocated Students</h1>
            <p className="text-slate-500">Manage your mentoring sessions and student progress</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
            👨‍🏫
          </div>
        </div>

        {allocations.length === 0 ? (
          <div className="p-8 rounded-2xl bg-yellow-50 border border-yellow-200 text-yellow-800 text-center">
            <p className="font-medium">No students allocated to you yet.</p>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50">
                    <th className="p-4 pl-6 font-semibold text-slate-600 text-sm">#</th>
                    <th className="p-4 font-semibold text-slate-600 text-sm">Student Name</th>
                    <th className="p-4 font-semibold text-slate-600 text-sm">Enrollment</th>
                    <th className="p-4 pr-6 font-semibold text-slate-600 text-sm text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allocations.map((a, i) => (
                    <tr key={a.studentmentorid} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 pl-6 text-slate-500 font-medium">{i + 1}</td>
                      <td className="p-4 text-slate-800 font-medium">{a.student.studentname}</td>
                      <td className="p-4 text-slate-500 font-mono text-sm">{a.student.enrollmentno}</td>
                      <td className="p-4 pr-6 text-right">
                        <div className="flex gap-2 justify-end">
                          {a.studentmentoring.length === 0 ? (
                            <Link
                              href={`/staff/mentoring/${a.studentmentorid}`}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-emerald-500/20"
                            >
                              <span>Start Session</span>
                              <span>→</span>
                            </Link>
                          ) : (
                            <>
                              <Link
                                href={`/staff/mentoring/${a.studentmentorid}`}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-blue-500/20"
                              >
                                <span>Update Session</span>
                                <span>✏️</span>
                              </Link>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
