import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const data = await prisma.studentmentor.findMany({
      include: {
        student: true,
        staff: true,
      },
      orderBy: { created: 'desc' }
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch mentorships:', error);
    return NextResponse.json({ error: 'Failed to fetch mentorships' }, { status: 500 });
  }
}
