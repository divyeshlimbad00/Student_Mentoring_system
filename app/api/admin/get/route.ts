import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const admins = await prisma.admin.findMany({
      orderBy: { created: 'desc' }
    });
    return NextResponse.json(admins);
  } catch (error) {
    console.error('Failed to fetch admins:', error);
    return NextResponse.json({ error: 'Failed to fetch admins' }, { status: 500 });
  }
}
