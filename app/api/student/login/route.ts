import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { enrollment } = await req.json();

  const student = await prisma.student.findFirst({
    where: { enrollmentno: enrollment },
  });

  if (!student) {
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({
    success: true,
    studentId: student.studentid,
  });
}
