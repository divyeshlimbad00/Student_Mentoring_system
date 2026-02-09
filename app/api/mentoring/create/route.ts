import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();

  await prisma.studentmentoring.create({
    data: {
      studentmentorid: Number(form.get("studentmentorid")),
      dateofmentoring: form.get("dateofmentoring")
        ? new Date(form.get("dateofmentoring") as string)
        : null,
      nextmentoringdate: form.get("nextmentoringdate")
        ? new Date(form.get("nextmentoringdate") as string)
        : null,
      issuesdiscussed: form.get("issuesdiscussed") as string,
      mentoringmeetingagenda: form.get("mentoringmeetingagenda") as string,
      attendancestatus: form.get("attendancestatus") as string,
      studentsopinion: form.get("studentsopinion") as string,
      staffopinion: form.get("staffopinion") as string,
    },
  });

  return NextResponse.redirect(req.headers.get("referer")!);
}
