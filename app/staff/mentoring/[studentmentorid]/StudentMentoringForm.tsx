"use client";
import "./mentoring.css";
import { Card } from "../../../components/ui/Card";
import Link from "next/link";

type Props = {
  studentmentorid: number;
  existingMentoring: any | null;
  action: (formData: FormData) => void;
};

export default function StudentMentoringForm({
  studentmentorid,
  existingMentoring,
  action,
}: Props) {
  const isEdit = !!existingMentoring;
  const pageTitle = isEdit ? "Update Mentoring Session" : "Create New Session";
  const pageDescription = isEdit
    ? "Review and modify the details of this mentoring session."
    : "Fill out the form below to record a new mentoring interaction.";
  const themeColor = isEdit ? "indigo" : "blue"; // Distinct theme colors

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Top Navigation */}
        <div className="mb-8">
          <Link href="/staff" className="text-slate-500 hover:text-slate-800 transition-colors font-medium flex items-center gap-2">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Header Section */}
        <div className={`mb-8 p-8 rounded-3xl bg-gradient-to-r ${isEdit ? 'from-indigo-600 to-purple-600' : 'from-blue-600 to-cyan-600'} text-white shadow-xl relative overflow-hidden`}>
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20">
                  {isEdit ? "EDIT MODE" : "NEW ENTRY"}
                </span>
              </div>
              <h1 className="text-4xl font-bold font-display mb-2 tracking-tight">{pageTitle}</h1>
              <p className="text-blue-100 text-lg opacity-90 max-w-2xl">{pageDescription}</p>
            </div>

            {/* Student Info Pill */}
            {existingMentoring?.studentmentor?.student && (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4 min-w-[200px]">
                <div className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xl shadow-lg">
                  {existingMentoring.studentmentor.student.studentname.charAt(0)}
                </div>
                <div>
                  <div className="text-xs text-blue-100 uppercase font-semibold">Student</div>
                  <div className="font-bold text-white text-lg leading-tight">{existingMentoring.studentmentor.student.studentname}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <form action={action} className="space-y-8">
          <input type="hidden" name="studentmentorid" value={studentmentorid} />
          {isEdit && (
            <input
              type="hidden"
              name="studentmentoringid"
              value={existingMentoring.studentmentoringid}
            />
          )}

          {/* Meeting Information */}
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className={`w-8 h-8 rounded-lg ${isEdit ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-100 text-blue-600'} flex items-center justify-center`}>📅</span>
              Session Details
            </h2>
            <Card className="p-8 border-0 shadow-lg ring-1 ring-slate-900/5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="group">
                  <label className="block text-sm font-bold text-slate-700 mb-2 group-focus-within:text-blue-600 transition-colors">Date of Mentoring <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    name="dateofmentoring"
                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                    defaultValue={existingMentoring?.dateofmentoring ? new Date(existingMentoring.dateofmentoring).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Scheduled Date</label>
                  <input
                    type="date"
                    name="scheduledmeetingdate"
                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                    defaultValue={existingMentoring?.scheduledmeetingdate ? new Date(existingMentoring.scheduledmeetingdate).toISOString().split('T')[0] : ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Next Follow-up</label>
                  <input
                    type="date"
                    name="nextmentoringdate"
                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                    defaultValue={existingMentoring?.nextmentoringdate ? new Date(existingMentoring.nextmentoringdate).toISOString().split('T')[0] : ''}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Meeting Agenda</label>
                <textarea
                  name="mentoringmeetingagenda"
                  className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  rows={2}
                  defaultValue={existingMentoring?.mentoringmeetingagenda || ''}
                  placeholder="Briefly describe the purpose of this session..."
                />
              </div>
            </Card>
          </section>

          {/* Discussion & Issues */}
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className={`w-8 h-8 rounded-lg ${isEdit ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-100 text-blue-600'} flex items-center justify-center`}>💬</span>
              Discussion Points
            </h2>
            <Card className="p-8 border-0 shadow-lg ring-1 ring-slate-900/5">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Issues Discussed</label>
                  <textarea
                    name="issuesdiscussed"
                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    rows={4}
                    defaultValue={existingMentoring?.issuesdiscussed || ''}
                    placeholder="Detailed notes on what was discussed regarding academic or personal issues..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">General Remarks / Description</label>
                  <textarea
                    name="description"
                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    rows={2}
                    defaultValue={existingMentoring?.description || ''}
                    placeholder="Any additional context or observations..."
                  />
                </div>
              </div>
            </Card>
          </section>

          {/* Attendance & Status */}
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className={`w-8 h-8 rounded-lg ${isEdit ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-100 text-blue-600'} flex items-center justify-center`}>📊</span>
              Student Status
            </h2>
            <Card className="p-8 border-0 shadow-lg ring-1 ring-slate-900/5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Attendance</label>
                  <select
                    name="attendancestatus"
                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer"
                    defaultValue={existingMentoring?.attendancestatus || 'Present'}
                  >
                    <option value="">Select Status</option>
                    <option value="Present">✅ Present</option>
                    <option value="Absent">❌ Absent</option>
                    <option value="Late">⏰ Late</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Stress Level</label>
                  <select
                    name="stresslevel"
                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer"
                    defaultValue={existingMentoring?.stresslevel || ''}
                  >
                    <option value="">Select Level</option>
                    <option value="Low">🟢 Low</option>
                    <option value="Medium">🟡 Medium</option>
                    <option value="High">🟠 High</option>
                    <option value="Critical">🔴 Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Learner Type</label>
                  <select
                    name="learnertype"
                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer"
                    defaultValue={existingMentoring?.learnertype || ''}
                  >
                    <option value="">Select Type</option>
                    <option value="Fast">🚀 Fast Learner</option>
                    <option value="Average">⚖️ Average Learner</option>
                    <option value="Slow">🐢 Slow Learner</option>
                  </select>
                </div>
                <div className="lg:col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Absent Remarks</label>
                  <input
                    type="text"
                    name="absentremarks"
                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    defaultValue={existingMentoring?.absentremarks || ''}
                    placeholder="Why was student absent?"
                  />
                </div>
              </div>
            </Card>
          </section>

          {/* Parent Details */}
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className={`w-8 h-8 rounded-lg ${isEdit ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-100 text-blue-600'} flex items-center justify-center`}>👨‍👩‍👧</span>
              Parent Interaction
            </h2>
            <Card className="p-8 border-0 shadow-lg ring-1 ring-slate-900/5">
              <div className="mb-6 p-4 bg-yellow-50 rounded-xl border border-yellow-100 flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isparentpresent"
                  id="isparentpresent"
                  className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  defaultChecked={existingMentoring?.isparentpresent || false}
                />
                <label htmlFor="isparentpresent" className="font-bold text-slate-800 cursor-pointer select-none">Mark this checkbox if a parent was present during the meeting</label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Parent Name</label>
                  <input
                    type="text"
                    name="parentname"
                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    defaultValue={existingMentoring?.parentname || ''}
                    placeholder="Name of parent attending"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Parent Contact</label>
                  <input
                    type="text"
                    name="parentmobileno"
                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    defaultValue={existingMentoring?.parentmobileno || ''}
                    placeholder="Mobile number"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Parent's Opinion / Feedback</label>
                <textarea
                  name="parentsopinion"
                  className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  rows={2}
                  defaultValue={existingMentoring?.parentsopinion || ''}
                  placeholder="Comments from the parent..."
                />
              </div>
            </Card>
          </section>

          {/* Feedback */}
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className={`w-8 h-8 rounded-lg ${isEdit ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-100 text-blue-600'} flex items-center justify-center`}>📝</span>
              Opinions & Uploads
            </h2>
            <Card className="p-8 border-0 shadow-lg ring-1 ring-slate-900/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Student's Opinion</label>
                  <textarea
                    name="studentsopinion"
                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    rows={3}
                    defaultValue={existingMentoring?.studentsopinion || ''}
                    placeholder="What the student feels..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Staff's Assessment</label>
                  <textarea
                    name="staffopinion"
                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    rows={3}
                    defaultValue={existingMentoring?.staffopinion || ''}
                    placeholder="Your professional assessment..."
                  />
                </div>
              </div>
            </Card>
          </section>

          {/* Action Button */}
          <div className="sticky bottom-4 z-20">
            <div className="absolute inset-0 bg-white/50 backdrop-blur-xl -z-10 rounded-2xl shadow-2xl border border-white/40"></div>
            <div className="flex gap-4 p-2">
              <Link href="/staff" className="flex-1 bg-white hover:bg-slate-50 text-slate-700 font-bold py-4 px-8 rounded-xl transition-all shadow-sm border border-slate-200 text-center">
                Cancel
              </Link>
              <button
                type="submit"
                className={`flex-[3] ${isEdit ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/30' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30'} text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg transform active:scale-[0.99] flex items-center justify-center gap-3 text-lg`}
              >
                {isEdit ? "Update Session Details" : "Save New Session"}
              </button>
            </div>
          </div>
          <div className="h-12"></div> {/* Spacer */}

        </form>
      </div>
    </div>
  );
}
