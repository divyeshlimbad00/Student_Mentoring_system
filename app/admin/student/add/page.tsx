import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from 'next/link';

export default function AddStudent() {
  async function createStudent(formData: FormData) {
    "use server";
    await prisma.student.create({
      data: {
        studentname: formData.get("studentname") as string,
        enrollmentno: formData.get("enrollmentno") as string,
        mobileno: formData.get("mobileno") as string,
        emailaddress: formData.get("emailaddress") as string,
        password: formData.get("password") as string,
      },
    });
    redirect("/admin/student");
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative">
      <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-green-100/50 to-transparent z-0 pointer-events-none" />
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 sticky top-0 z-20 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">Register New Student</h1>
        <p className="text-sm text-gray-500">Add a new student to the academic database</p>
      </header>

      <main className="max-w-lg mx-auto px-6 py-8 relative z-10">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 lg:p-8 hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50/50 rounded-full translate-x-12 -translate-y-12 z-0" />
          <form action={createStudent} className="space-y-5 relative z-10">
            <div>
              <label htmlFor="studentname" className="block text-sm font-medium text-gray-700 mb-1">
                Student Name <span className="text-red-500">*</span>
              </label>
              <input id="studentname" name="studentname" type="text" required
                placeholder="e.g. Riya Shah"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="enrollmentno" className="block text-sm font-medium text-gray-700 mb-1">
                Enrollment Number <span className="text-red-500">*</span>
              </label>
              <input id="enrollmentno" name="enrollmentno" type="text" required
                placeholder="e.g. 220170107001"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="mobileno" className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input id="mobileno" name="mobileno" type="text" required
                placeholder="e.g. 9876543210"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="emailaddress" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input id="emailaddress" name="emailaddress" type="email" required
                placeholder="e.g. riya.shah@example.com"
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
                className="flex-1 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow hover:-translate-y-0.5 transition-all">
                Register Student
              </button>
              <Link href="/admin/student"
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
