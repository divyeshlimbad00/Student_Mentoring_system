import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AllocatePage() {
  noStore();
  // Filter out students who already have an active mentorship allocation
  const students = await prisma.student.findMany({ 
    where: {
      studentmentor: {
        none: {},
      },
    },
    orderBy: { created: "desc" } 
  });
  const staffs = await prisma.staff.findMany({ orderBy: { created: "desc" } });

  async function createAllocation(formData: FormData) {
    "use server";
    const studentid = Number(formData.get("studentid"));
    const staffid = Number(formData.get("staffid"));
    const fromdate = formData.get("fromdate") as string;
    const todate = (formData.get("todate") as string) || null;

    await prisma.studentmentor.create({
      data: {
        studentid,
        staffid,
        fromdate: new Date(fromdate),
        todate: todate ? new Date(todate) : null,
      },
    });
    redirect("/admin/studentmentor");
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative">
      <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-orange-100/50 to-transparent z-0 pointer-events-none" />
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 sticky top-0 z-20 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">Allocate Mentor to Student</h1>
        <p className="text-sm text-gray-500">Create a new student-mentor assignment</p>
      </header>

      <main className="max-w-lg mx-auto px-6 py-8 relative z-10">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 lg:p-8 hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/50 rounded-full translate-x-12 -translate-y-12 z-0" />
          <form action={createAllocation} className="space-y-5 relative z-10">
            <div>
              <label htmlFor="studentid" className="block text-sm font-medium text-gray-700 mb-1">
                Student <span className="text-red-500">*</span>
              </label>
              <select id="studentid" name="studentid" required
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">— Select a student —</option>
                {students.map((s) => (
                  <option key={s.studentid} value={s.studentid}>
                    {s.studentname} ({s.enrollmentno})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="staffid" className="block text-sm font-medium text-gray-700 mb-1">
                Mentor <span className="text-red-500">*</span>
              </label>
              <select id="staffid" name="staffid" required
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">— Select a mentor —</option>
                {staffs.map((m) => (
                  <option key={m.staffid} value={m.staffid}>
                    {m.staffname}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit"
                className="flex-1 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow hover:-translate-y-0.5 transition-all">
                Allocate
              </button>
              <Link href="/admin/studentmentor"
                className="flex-1 py-2.5 text-center border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
