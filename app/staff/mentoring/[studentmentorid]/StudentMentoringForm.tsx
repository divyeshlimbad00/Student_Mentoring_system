"use client";
import Link from "next/link";

type Props = {
  studentmentorid: number;
  existingMentoring: any | null;
  action: (formData: FormData) => void;
  staffId?: number;
};

export default function StudentMentoringForm({ studentmentorid, existingMentoring, action, staffId }: Props) {
  const isEdit = !!existingMentoring;

  const inputCls = "w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-sm font-medium text-slate-800 bg-white/60 backdrop-blur-md placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all hover:border-slate-300 hover:bg-white/90";
  const textareaCls = "w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-sm font-medium text-slate-800 bg-white/60 backdrop-blur-md placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all hover:border-slate-300 hover:bg-white/90";
  const labelCls = "block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2";

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative overflow-x-hidden">
      <div className="absolute top-0 w-full h-80 bg-gradient-to-br from-indigo-200 via-blue-100 to-transparent z-0 pointer-events-none" />
      
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 px-8 py-5 flex items-center justify-between sticky top-0 z-30 shadow-sm transition-all hover:bg-white/95">
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-600">
            {isEdit ? "Update Mentoring Session" : "New Mentoring Session"}
          </h1>
          {existingMentoring?.studentmentor?.student && (
            <p className="text-sm font-semibold text-gray-500 mt-1">
              Student: <strong className="text-gray-800">{existingMentoring.studentmentor.student.studentname}</strong>
            </p>
          )}
        </div>
        <Link
          href={staffId ? `/staff/${staffId}` : "/staff"}
          className="text-sm font-bold text-gray-600 bg-white border-2 border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 flex items-center gap-2 transition-all shadow-sm hover:shadow"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 relative z-10">
        <form action={action} className="space-y-8">
          <input type="hidden" name="studentmentorid" value={studentmentorid} />
          {isEdit && (
            <input type="hidden" name="studentmentoringid" value={existingMentoring.studentmentoringid} />
          )}

          <section className="bg-white/90 backdrop-blur-xl border border-blue-100 rounded-3xl shadow-sm p-8 hover:shadow-xl hover:border-blue-300 transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-100/80 to-indigo-100/80 rounded-full translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-700 opacity-60 pointer-events-none" />
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-3 relative z-10">
              <span className="w-8 h-1 bg-blue-300 rounded-full"></span> Session Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 relative z-10">
              <div>
                <label className={labelCls}>Date of Mentoring <span className="text-red-500">*</span></label>
                <input type="date" name="dateofmentoring" required className={inputCls}
                  defaultValue={existingMentoring?.dateofmentoring ? new Date(existingMentoring.dateofmentoring).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            <div className="relative z-10">
              <label className={labelCls}>Meeting Agenda</label>
              <textarea name="mentoringmeetingagenda" rows={2} className={textareaCls}
                placeholder="Ex: Discuss academic progress and career goals..."
                defaultValue={existingMentoring?.mentoringmeetingagenda || ''}
              />
            </div>
          </section>

          <section className="bg-white/90 backdrop-blur-xl border border-purple-100 rounded-3xl shadow-sm p-8 hover:shadow-xl hover:border-purple-300 transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-100/80 to-fuchsia-100/80 rounded-full translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-700 opacity-60 pointer-events-none" />
            <h2 className="text-sm font-bold text-purple-600 uppercase tracking-widest mb-6 flex items-center gap-3 relative z-10">
              <span className="w-8 h-1 bg-purple-300 rounded-full"></span> Discussion Points
            </h2>
            <div className="relative z-10">
              <label className={labelCls}>Issues Discussed</label>
              <textarea name="issuesdiscussed" rows={3} className={textareaCls}
                placeholder="Ex: Student mentioned difficulty in time management..."
                defaultValue={existingMentoring?.issuesdiscussed || ''}
              />
            </div>
          </section>

          <section className="bg-white/90 backdrop-blur-xl border border-emerald-100 rounded-3xl shadow-sm p-8 hover:shadow-xl hover:border-emerald-300 transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-emerald-100/80 to-teal-100/80 rounded-full translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-700 opacity-60 pointer-events-none" />
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-6 flex items-center gap-3 relative z-10">
              <span className="w-8 h-1 bg-emerald-300 rounded-full"></span> Student Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              <div>
                <label className={labelCls}>Stress Level</label>
                <div className="relative">
                  <select name="stresslevel" className={`${inputCls} appearance-none pr-10`} defaultValue={existingMentoring?.stresslevel || ''}>
                    <option value="">Select level...</option>
                    <option value="Low">🟢 Low</option>
                    <option value="Medium">🟡 Medium</option>
                    <option value="High">🔴 High</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
              <div>
                <label className={labelCls}>Learner Type</label>
                <div className="relative">
                  <select name="learnertype" className={`${inputCls} appearance-none pr-10`} defaultValue={existingMentoring?.learnertype || ''}>
                    <option value="">Select type...</option>
                    <option value="Fast">🚀 Fast Learner</option>
                    <option value="Average">👍 Average Learner</option>
                    <option value="Slow">⏱️ Slow Learner</option>
                    <option value="Advanced">🌟 Advanced</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white/90 backdrop-blur-xl border border-amber-100 rounded-3xl shadow-sm p-8 hover:shadow-xl hover:border-amber-300 transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-amber-100/80 to-orange-100/80 rounded-full translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-700 opacity-60 pointer-events-none" />
            <h2 className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-6 flex items-center gap-3 relative z-10">
              <span className="w-8 h-1 bg-amber-300 rounded-full"></span> Opinions &amp; Feedback
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div>
                <label className={labelCls}>Student's Opinion</label>
                <textarea name="studentsopinion" rows={3} className={textareaCls}
                  placeholder="What the student expressed..."
                  defaultValue={existingMentoring?.studentsopinion || ''}
                />
              </div>
              <div>
                <label className={labelCls}>Staff's Assessment</label>
                <textarea name="staffopinion" rows={3} className={textareaCls}
                  placeholder="Your professional assessment..."
                  defaultValue={existingMentoring?.staffopinion || ''}
                />
              </div>
            </div>
          </section>

          <section className="bg-white/90 backdrop-blur-xl border border-pink-100 rounded-3xl shadow-sm p-8 hover:shadow-xl hover:border-pink-300 transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-pink-100/80 to-rose-100/80 rounded-full translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-700 opacity-60 pointer-events-none" />
            <h2 className="text-sm font-bold text-pink-500 uppercase tracking-widest mb-6 flex items-center gap-3 relative z-10">
              <span className="w-8 h-1 bg-pink-300 rounded-full"></span> Parent Interaction
            </h2>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8 bg-pink-50/50 p-4 rounded-xl border border-pink-100 inline-flex cursor-pointer hover:bg-pink-100/50 transition-colors">
                <input
                  type="checkbox"
                  name="isparentpresent"
                  id="isparentpresent"
                  className="w-5 h-5 rounded border-2 border-pink-300 text-pink-600 focus:ring-pink-500 focus:ring-offset-2 cursor-pointer transition-colors"
                  defaultChecked={existingMentoring?.isparentpresent || false}
                />
                <label htmlFor="isparentpresent" className="text-sm font-bold text-slate-700 cursor-pointer select-none">
                  Parent was present during this session
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className={labelCls}>Parent Name</label>
                  <input type="text" name="parentname" className={inputCls}
                    placeholder="E.g. John Doe"
                    defaultValue={existingMentoring?.parentname || ''}
                  />
                </div>
                <div>
                  <label className={labelCls}>Parent Mobile</label>
                  <input type="text" name="parentmobileno" className={inputCls}
                    placeholder="Contact number"
                    defaultValue={existingMentoring?.parentmobileno || ''}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>Parent's Opinion</label>
                <textarea name="parentsopinion" rows={2} className={textareaCls}
                  placeholder="Feedback from parents..."
                  defaultValue={existingMentoring?.parentsopinion || ''}
                />
              </div>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 pb-8">
            <button type="submit"
              className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all uppercase tracking-wider flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              {isEdit ? "Update Session" : "Save Session Records"}
            </button>
            <Link
              href={staffId ? `/staff/${staffId}` : "/staff"}
              className="sm:w-1/3 py-4 text-center border-2 border-slate-200 text-slate-600 text-base font-bold rounded-2xl hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800 transition-all uppercase tracking-wider"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
