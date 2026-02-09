import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();

  await prisma.studentmentoring.update({
    where: {
      studentmentoringid: Number(form.get("studentmentoringid")),
    },
    data: {
      issuesdiscussed: form.get("issuesdiscussed") as string,
      mentoringmeetingagenda: form.get("mentoringmeetingagenda") as string,
      attendancestatus: form.get("attendancestatus") as string,
      studentsopinion: form.get("studentsopinion") as string,
      staffopinion: form.get("staffopinion") as string,
      modified: new Date(),
    },
  });

  return NextResponse.redirect(req.headers.get("referer")!);
}
