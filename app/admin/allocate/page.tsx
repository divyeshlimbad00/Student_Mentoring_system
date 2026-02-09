import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AllocateMentor() {
  const staff = await prisma.staff.findMany({
    orderBy: { staffname: 'asc' }
  });
  const students = await prisma.student.findMany({
    orderBy: { studentname: 'asc' }
  });

  async function allocate(formData: FormData) {
    "use server";

    await prisma.studentmentor.create({
      data: {
        staffid: Number(formData.get("staffid")),
        studentid: Number(formData.get("studentid")),
        fromdate: formData.get("fromdate") ? new Date(formData.get("fromdate") as string) : new Date(),
        todate: formData.get("todate") ? new Date(formData.get("todate") as string) : null,
      },
    });

    redirect("/admin/studentmentor");
  }

  return (
    <div className="min-h-screen bg-light d-flex align-items-center justify-content-center p-4">
      <div className="card shadow-lg border-0 rounded-4 w-100" style={{ maxWidth: "600px" }}>

        {/* Header */}
        <div className="card-header bg-gradient bg-primary text-white p-4 text-center rounded-top-4">
          <h2 className="fs-3 fw-bold mb-1">🤝 Allocate Mentor</h2>
          <p className="small text-white-50 mb-0">Assign a staff mentor to a student</p>
        </div>

        <div className="card-body p-4 p-md-5">
          <form action={allocate} className="d-flex flex-column gap-4">

            {/* Mentor Selection */}
            <div>
              <label className="form-label fw-bold text-secondary text-uppercase small">Select Mentor</label>
              <select name="staffid" required className="form-select form-select-lg shadow-sm border-light bg-light" style={{ cursor: 'pointer' }}>
                <option value="">-- Choose a Mentor --</option>
                {staff.map((s) => (
                  <option key={s.staffid} value={s.staffid}>
                    {s.staffname} (ID: {s.staffid})
                  </option>
                ))}
              </select>
            </div>

            {/* Student Selection */}
            <div>
              <label className="form-label fw-bold text-secondary text-uppercase small">Select Student</label>
              <select name="studentid" required className="form-select form-select-lg shadow-sm border-light bg-light" style={{ cursor: 'pointer' }}>
                <option value="">-- Choose a Student --</option>
                {students.map((s) => (
                  <option key={s.studentid} value={s.studentid}>
                    {s.studentname} (Enroll: {s.enrollmentno})
                  </option>
                ))}
              </select>
            </div>

            {/* Dates (Optional but good to have) */}
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-bold text-secondary text-uppercase small">Start Date</label>
                <input type="date" name="fromdate" className="form-control shadow-sm border-light bg-light" />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold text-secondary text-uppercase small">End Date</label>
                <input type="date" name="todate" className="form-control shadow-sm border-light bg-light" />
              </div>
            </div>

            {/* Buttons */}
            <div className="d-grid gap-2 mt-4">
              <button type="submit" className="btn btn-primary btn-lg shadow fw-bold transition-all hover-scale">
                Confirm Allocation
              </button>
              <Link href="/admin/studentmentor" className="btn btn-outline-secondary btn-lg border-0">
                Cancel
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
