import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function StaffStudentDetail({
  params,
}: {
  params: Promise<{ studentMentoringId: string }>;
}) {
  const { studentMentoringId } = await params;

  const data = await prisma.studentmentoring.findUnique({
    where: { studentmentoringid: Number(studentMentoringId) },
    include: {
      studentmentor: {
        include: {
          student: true,
          staff: true,
        },
      },
    },
  });

  if (!data) return <div>Record not found</div>;

  return (
    <div className="container py-5">
      <h4>📝 Mentoring Details</h4>

      <p><b>Student:</b> {data.studentmentor.student.studentname}</p>
      <p><b>Staff:</b> {data.studentmentor.staff.staffname}</p>
      <p><b>Issues:</b> {data.issuesdiscussed ?? "—"}</p>

      <Link href={`/staff/${data.studentmentor.staffid}`} className="btn btn-secondary">
        ← Back
      </Link>
    </div>
  );
}

export default StaffStudentDetail;
