import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from 'next/link';

export default function AddStaff() {
  async function createStaff(formData: FormData) {
    "use server";
    await prisma.staff.create({
      data: {
        staffname: formData.get("staffname") as string,
        emailaddress: formData.get("email") as string,
        mobileno: formData.get("mobile") as string,
        password: formData.get("password") as string,
      },
    });
    redirect("/admin/staff");
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative">
      <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-blue-100/50 to-transparent z-0 pointer-events-none" />
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 sticky top-0 z-20 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">Add New Mentor</h1>
        <p className="text-sm text-gray-500">Create a new staff profile for mentorship</p>
      </header>

      <main className="max-w-lg mx-auto px-6 py-8 relative z-10">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 lg:p-8 hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full translate-x-12 -translate-y-12 z-0" />
          <form action={createStaff} className="space-y-5 relative z-10">
            <div>
              <label htmlFor="staffname" className="block text-sm font-medium text-gray-700 mb-1">
                Mentor Name <span className="text-red-500">*</span>
              </label>
              <input id="staffname" name="staffname" type="text" required
                placeholder="e.g. Dr. Ramesh Patel"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input id="email" name="email" type="email" required
                placeholder="e.g. ramesh.patel@college.edu"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input id="mobile" name="mobile" type="text"
                placeholder="e.g. 9876543210"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input id="password" name="password" type="password" required
                placeholder="Set a password"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit"
                className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow hover:-translate-y-0.5 transition-all">
                Create Mentor
              </button>
              <Link href="/admin/staff"
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
