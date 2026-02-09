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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-red-100 text-center">
          <div className="text-red-500 text-xl font-semibold mb-2">Invalid Student ID</div>
          <Link href="/student/login" className="text-slate-600 hover:text-slate-900 underline">
            Return to Login
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
      studentmentoringid: 'desc' // Get the latest session if multiple exist, though findFirst gets one.
    }
  });

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            ℹ️
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">No Mentoring Session Found</h3>
          <p className="text-slate-500 mb-6">There are no mentoring records available for your account yet.</p>
          <Link href="/student/login" className="btn btn-primary w-full">
            Back to Dashboard
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

  const InfoItem = ({ label, value, fullWidth = false }: { label: string; value: React.ReactNode; fullWidth?: boolean }) => (
    <div className={`mb-4 ${fullWidth ? "col-span-2" : ""}`}>
      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</div>
      <div className="text-slate-800 font-medium bg-slate-50 rounded-lg p-3 border border-slate-100 min-h-[46px]">
        {value || <span className="text-slate-400 italic">N/A</span>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Mentoring Session</h1>
            <p className="text-slate-500 mt-1">Detailed view of your mentoring progress and feedback</p>
          </div>
          <Link
            href="/student/login"
            className="inline-flex items-center justify-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all font-medium shadow-sm"
          >
            ← Back to Login
          </Link>
        </div>

        <div className="grid gap-6">
          {/* Main Info Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-900/5 px-6 py-4 border-b border-slate-200 flex items-center gap-3">
              <span className="text-xl">👤</span>
              <h2 className="font-semibold text-slate-800">Student & Mentor Details</h2>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-6">
              <InfoItem label="Student Name" value={data.studentmentor.student.studentname} />
              <InfoItem label="Mentor Name" value={data.studentmentor.staff.staffname} />
              <InfoItem label="Enrollment No" value={data.studentmentor.student.enrollmentno} />
              <InfoItem label="Mentor Email" value={data.studentmentor.staff.emailaddress} />
            </div>
          </div>

          {/* Session Timing & Status */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-blue-50/50 px-6 py-4 border-b border-blue-100 flex items-center gap-3">
              <span className="text-xl">📅</span>
              <h2 className="font-semibold text-slate-800">Session Timing & Attendance</h2>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-6">
              <InfoItem label="Mentoring Date" value={formatDate(data.dateofmentoring)} />
              <InfoItem label="Scheduled Date" value={formatDate(data.scheduledmeetingdate)} />
              <InfoItem label="Next Session" value={formatDate(data.nextmentoringdate)} />

              <div className="mb-4">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Attendance Status</div>
                <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${data.attendancestatus === 'Present'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : data.attendancestatus === 'Absent'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}>
                  {data.attendancestatus || 'Not Recorded'}
                </div>
              </div>

              {data.attendancestatus === 'Absent' && (
                <InfoItem label="Absent Remarks" value={data.absentremarks} fullWidth />
              )}
            </div>
          </div>

          {/* Discussion Details */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-indigo-50/50 px-6 py-4 border-b border-indigo-100 flex items-center gap-3">
              <span className="text-xl">💬</span>
              <h2 className="font-semibold text-slate-800">Discussion & Agenda</h2>
            </div>
            <div className="p-6 grid md:grid-cols-1 gap-6">
              <InfoItem label="Meeting Agenda" value={data.mentoringmeetingagenda} />
              <InfoItem label="Issues Discussed" value={data.issuesdiscussed} />
              <InfoItem label="Description / Notes" value={data.description} />
            </div>
          </div>

          {/* Feedback & Opinions */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-amber-50/50 px-6 py-4 border-b border-amber-100 flex items-center gap-3">
              <span className="text-xl">📝</span>
              <h2 className="font-semibold text-slate-800">Feedback & Opinions</h2>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-6">
              <InfoItem label="Student's Opinion" value={data.studentsopinion} />
              <InfoItem label="Staff's Opinion" value={data.staffopinion} />
              <InfoItem label="Stress Level" value={data.stresslevel} />
              <InfoItem label="Learner Type" value={data.learnertype} />
            </div>
          </div>

          {/* Parent Involvement */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-emerald-50/50 px-6 py-4 border-b border-emerald-100 flex items-center gap-3">
              <span className="text-xl">👨‍👩‍👦</span>
              <h2 className="font-semibold text-slate-800">Parental Involvement</h2>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-6">
              <div className="mb-4">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Parent Present?</div>
                <div className="text-slate-800 font-medium">
                  {data.isparentpresent ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600">
                      ✅ Yes
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-slate-500">
                      ❌ No
                    </span>
                  )}
                </div>
              </div>

              {data.isparentpresent && (
                <>
                  <InfoItem label="Parent Name" value={data.parentname} />
                  <InfoItem label="Parent Mobile" value={data.parentmobileno} />
                  <InfoItem label="Parent's Opinion" value={data.parentsopinion} fullWidth />
                </>
              )}
            </div>
          </div>

        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            Last updated: {data.modified ? new Date(data.modified).toLocaleString() : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
}

