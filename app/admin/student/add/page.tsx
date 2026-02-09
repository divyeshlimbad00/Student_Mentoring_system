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
        password: "123456",
      },
    });

    redirect("/admin/student");
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Register New Student
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Add a new student to the academic database.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="glass-card bg-white/80 backdrop-blur-xl py-8 px-4 shadow-xl border border-slate-200/60 sm:rounded-2xl sm:px-10">
          <form action={createStudent} className="space-y-6">
            <div>
              <label htmlFor="studentname" className="block text-sm font-semibold text-slate-700 mb-1">
                Student Name
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-400 sm:text-sm">🎓</span>
                </div>
                <input
                  id="studentname"
                  name="studentname"
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white/50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="e.g. John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="enrollmentno" className="block text-sm font-semibold text-slate-700 mb-1">
                Enrollment Number
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-400 sm:text-sm">🆔</span>
                </div>
                <input
                  id="enrollmentno"
                  name="enrollmentno"
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white/50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="e.g. 2023001"
                />
              </div>
            </div>

            <div>
              <label htmlFor="mobile" className="block text-sm font-semibold text-slate-700 mb-1">
                Mobile Number
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-400 sm:text-sm">📱</span>
                </div>
                <input
                  id="mobileno"
                  name="mobileno"
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white/50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="e.g. 9025548592"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-400 sm:text-sm">📧</span>
                </div>
                <input
                  id="emailaddress"
                  name="emailaddress"
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white/50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="e.g. john.doe@example.com"
                />
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Create Student Profile
              </button>

              <Link
                href="/admin/student"
                className="w-full flex justify-center py-3 px-4 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
