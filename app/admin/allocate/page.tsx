import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AllocateMentor() {
  const staff = await prisma.staff.findMany({
    orderBy: { staffname: "asc" },
  });
  const students = await prisma.student.findMany({
    orderBy: { studentname: "asc" },
  });

  async function allocate(formData: FormData) {
    "use server";

    await prisma.studentmentor.create({
      data: {
        staffid: Number(formData.get("staffid")),
        studentid: Number(formData.get("studentid")),
        fromdate: formData.get("fromdate")
          ? new Date(formData.get("fromdate") as string)
          : new Date(),
        todate: formData.get("todate")
          ? new Date(formData.get("todate") as string)
          : null,
      },
    });

    redirect("/admin/studentmentor");
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Card */}
        <div className="bg-card border border-border rounded-xl shadow-xl overflow-hidden glass-card">
          {/* Header */}
          <div className="bg-primary p-6 text-center">
            <h1 className="text-2xl font-bold text-primary-foreground mb-1">
              🤝 Allocate Mentor
            </h1>
            <p className="text-primary-foreground/80 text-sm">
              Assign a staff mentor to a student
            </p>
          </div>

          {/* Body */}
          <div className="p-8">
            <form action={allocate} className="space-y-6">
              {/* Mentor Selection */}
              <div className="space-y-2">
                <label
                  htmlFor="staffid"
                  className="block text-sm font-medium text-foreground uppercase tracking-wide"
                >
                  Select Mentor
                </label>
                <div className="relative">
                  <select
                    id="staffid"
                    name="staffid"
                    required
                    className="w-full bg-background border border-border text-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block p-3 shadow-sm transition-colors cursor-pointer appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      -- Choose a Mentor --
                    </option>
                    {staff.map((s) => (
                      <option key={s.staffid} value={s.staffid}>
                        {s.staffname} (ID: {s.staffid})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-secondary-foreground">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Student Selection */}
              <div className="space-y-2">
                <label
                  htmlFor="studentid"
                  className="block text-sm font-medium text-foreground uppercase tracking-wide"
                >
                  Select Student
                </label>
                <div className="relative">
                  <select
                    id="studentid"
                    name="studentid"
                    required
                    className="w-full bg-background border border-border text-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block p-3 shadow-sm transition-colors cursor-pointer appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      -- Choose a Student --
                    </option>
                    {students.map((s) => (
                      <option key={s.studentid} value={s.studentid}>
                        {s.studentname} (Enroll: {s.enrollmentno})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-secondary-foreground">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Optional: Date Fields (Hidden by default in original, adding purely for completeness if desired, but sticking to improved layout of existing fields for now to match exactly what they had, just better) */}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  href="/admin/studentmentor"
                  className="w-full sm:w-1/2 flex items-center justify-center px-4 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  ❌ Cancel
                </Link>
                <button
                  type="submit"
                  className="w-full sm:w-1/2 flex items-center justify-center px-4 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-sm font-bold shadow-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  ✅ Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
