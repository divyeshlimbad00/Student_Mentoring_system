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
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#EFF6FF] font-sans relative selection:bg-blue-100 selection:text-blue-900 pb-16">
      <div className="absolute top-0 w-full h-96 bg-gradient-to-b from-blue-100/40 via-blue-50/20 to-transparent z-0 pointer-events-none blur-3xl" />
      
      <header className="bg-white/70 backdrop-blur-xl border-b border-white/50 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-4">
          <Link href="/admin/staff" className="p-2 bg-white/50 hover:bg-white text-gray-500 hover:text-blue-600 rounded-xl transition-all shadow-sm border border-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Add New Mentor</h1>
            <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mt-0.5">Create a new staff profile for mentorship</p>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-6 py-12 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 lg:p-10 relative overflow-hidden transition-all group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-8 border border-white shadow-sm">
             <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
          </div>

          <form action={createStaff} className="space-y-6 relative z-10">
            <div>
              <label htmlFor="staffname" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Mentor Name <span className="text-red-500">*</span>
              </label>
              <input id="staffname" name="staffname" type="text" required
                placeholder="e.g. Dr. Ramesh Patel"
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input id="email" name="email" type="email" required
                placeholder="e.g. ramesh.patel@college.edu"
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="mobile" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Mobile Number
              </label>
              <input id="mobile" name="mobile" type="text"
                placeholder="e.g. 9876543210"
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input id="password" name="password" type="password" required
                placeholder="Set a password"
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white transition-all shadow-sm"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Link href="/admin/staff"
                className="flex-1 py-3 text-center bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-50 shadow-sm transition-all focus:ring-2 focus:ring-gray-200">
                Cancel
              </Link>
              <button type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Create Mentor
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
