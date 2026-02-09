import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  const staff = await prisma.staff.findFirst({
    where: { emailaddress: email },
  });

  if (!staff) {
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({
    success: true,
    staffId: staff.staffid,
  });
}
