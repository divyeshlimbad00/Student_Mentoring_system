import { prisma } from "@/lib/prisma";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DetailUser({ params }: Props) {
  const { id } = await params;
  const studentId = Number(id);

  if (isNaN(studentId)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-100 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            ⚠️
          </div>
          <div className="text-red-600 text-xl font-bold mb-2">Invalid Student ID</div>
          <p className="text-slate-500 mb-6">The student ID you provided is not valid.</p>
          <Link href="/student/login" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            ← Return to Login
          </Link>
        </div>
      </div>
    );
  }

  const data = await prisma.studentmentoring.findFirst({
    where: {
      studentmentor: {
        studentid: studentId,
      },
    },
    include: {
      studentmentor: {
        include: {
          student: true,
          staff: true,
        },
      },
    },
    orderBy: {
      studentmentoringid: 'desc',
    }
  });

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-blue-100 text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            ℹ️
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No Mentoring Session Found</h3>
          <p className="text-slate-600 mb-6">There are no mentoring records available for your account yet.</p>
          <Link href="/student/login" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium w-full">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date | null) => {
    if (!date) return <span className="text-slate-400 italic">Not scheduled</span>;
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const InfoItem = ({ label, value, fullWidth = false, icon }: { label: string; value: React.ReactNode; fullWidth?: boolean; icon?: string }) => (
    <div className={`${fullWidth ? "col-span-2" : ""}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-lg">{icon}</span>}
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{label}</label>
      </div>
      <div className="text-slate-900 font-medium bg-slate-50 rounded-lg p-4 border border-slate-200 hover:border-slate-300 transition-colors min-h-[48px] flex items-center">
        {value || <span className="text-slate-400 italic">N/A</span>}
      </div>
    </div>
  );

  const getStressLevelColor = (level: string | null) => {
    switch(level) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'High': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getLearnerTypeColor = (type: string | null) => {
    switch(type) {
      case 'Slow': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Average': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'Fast': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Advanced': return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                📚 Mentoring Session Details
              </h1>
              <p className="text-slate-600 text-lg">View your mentoring progress and feedback</p>
            </div>
            <Link
              href="/student/login"
              className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 rounded-lg font-semibold transition-all shadow-sm whitespace-nowrap"
            >
              ← Dashboard
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm text-center">
              <p className="text-3xl mb-1">👤</p>
              <p className="text-xs text-slate-600 font-semibold uppercase">Student</p>
              <p className="text-sm font-bold text-slate-900">{data.studentmentor.student.studentname}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm text-center">
              <p className="text-3xl mb-1">👨‍🏫</p>
              <p className="text-xs text-slate-600 font-semibold uppercase">Mentor</p>
              <p className="text-sm font-bold text-slate-900">{data.studentmentor.staff.staffname}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm text-center">
              <p className="text-3xl mb-1">{data.stresslevel === 'Low' ? '😊' : data.stresslevel === 'Medium' ? '😐' : '😰'}</p>
              <p className="text-xs text-slate-600 font-semibold uppercase">Stress</p>
              <p className="text-sm font-bold text-slate-900">{data.stresslevel || 'N/A'}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm text-center">
              <p className="text-3xl mb-1">📈</p>
              <p className="text-xs text-slate-600 font-semibold uppercase">Learner</p>
              <p className="text-sm font-bold text-slate-900">{data.learnertype || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Student & Mentor Details */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 sm:px-8 py-5 flex items-center gap-3">
              <span className="text-2xl">👥</span>
              <h2 className="font-bold text-white text-lg">Student & Mentor Details</h2>
            </div>
            <div className="p-6 sm:p-8 grid sm:grid-cols-2 gap-6">
              <InfoItem label="Student Name" value={data.studentmentor.student.studentname} icon="👤" />
              <InfoItem label="Mentor Name" value={data.studentmentor.staff.staffname} icon="👨‍🏫" />
              <InfoItem label="Enrollment No" value={data.studentmentor.student.enrollmentno} icon="🆔" />
              <InfoItem label="Mentor Email" value={data.studentmentor.staff.emailaddress} icon="✉️" />
            </div>
          </div>

          {/* Session Timing & Attendance */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 sm:px-8 py-5 flex items-center gap-3">
              <span className="text-2xl">📅</span>
              <h2 className="font-bold text-white text-lg">Session Timing & Attendance</h2>
            </div>
            <div className="p-6 sm:p-8 grid sm:grid-cols-2 gap-6">
              <InfoItem label="Mentoring Date" value={formatDate(data.dateofmentoring)} icon="📍" />
              <InfoItem label="Scheduled Date" value={formatDate(data.scheduledmeetingdate)} icon="🗓️" />
              <InfoItem label="Next Session" value={formatDate(data.nextmentoringdate)} icon="⏭️" />
              <InfoItem label="Attendance" value={
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${data.attendancestatus === 'Present' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'}`}>
                  {data.attendancestatus === 'Present' ? '✅ Present' : '❌ Absent'}
                </span>
              } icon="✔️" />
            </div>
          </div>

          {/* Discussion & Agenda */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 sm:px-8 py-5 flex items-center gap-3">
              <span className="text-2xl">💬</span>
              <h2 className="font-bold text-white text-lg">Discussion & Agenda</h2>
            </div>
            <div className="p-6 sm:p-8 space-y-6">
              <InfoItem label="Meeting Agenda" value={data.mentoringmeetingagenda} fullWidth icon="📝" />
              <InfoItem label="Issues Discussed" value={data.issuesdiscussed} fullWidth icon="🔍" />
            </div>
          </div>

          {/* Feedback & Opinions */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-6 sm:px-8 py-5 flex items-center gap-3">
              <span className="text-2xl">💭</span>
              <h2 className="font-bold text-white text-lg">Feedback & Opinions</h2>
            </div>
            <div className="p-6 sm:p-8 grid sm:grid-cols-2 gap-6">
              <InfoItem label="Student's Opinion" value={data.studentsopinion} icon="🎓" />
              <InfoItem label="Staff's Opinion" value={data.staffopinion} icon="👨‍🏫" />
              <InfoItem label="Stress Level" value={
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold border ${getStressLevelColor(data.stresslevel)}`}>
                  {data.stresslevel || 'N/A'}
                </span>
              } icon="📊" />
              <InfoItem label="Learner Type" value={
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold border ${getLearnerTypeColor(data.learnertype)}`}>
                  {data.learnertype || 'N/A'}
                </span>
              } icon="🧠" />
            </div>
          </div>

          {/* Parental Involvement */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-pink-600 to-pink-700 px-6 sm:px-8 py-5 flex items-center gap-3">
              <span className="text-2xl">👨‍👩‍👧</span>
              <h2 className="font-bold text-white text-lg">Parental Involvement</h2>
            </div>
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span>👤</span>
                  Parent Present?
                </label>
                <div className="text-slate-900 font-medium">
                  {data.isparentpresent ? (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-emerald-800 bg-emerald-100 border border-emerald-300 font-semibold">
                      ✅ Yes
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 bg-slate-100 border border-slate-300 font-semibold">
                      ❌ No
                    </span>
                  )}
                </div>
              </div>

              {data.isparentpresent && (
                <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                  <InfoItem label="Parent Name" value={data.parentname} icon="👤" />
                  <InfoItem label="Parent Mobile" value={data.parentmobileno} icon="📱" />
                  <InfoItem label="Parent's Opinion" value={data.parentsopinion} fullWidth icon="💬" />
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center pb-8">
          <p className="text-slate-500 text-sm">
            📌 Last updated: {data.modified ? new Date(data.modified).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
}

