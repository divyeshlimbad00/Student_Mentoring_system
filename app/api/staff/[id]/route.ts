import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const staffId = parseInt(id);

    const staff = await prisma.staff.findUnique({
      where: { staffid: staffId },
    });

    if (!staff) {
      return NextResponse.json(
        { error: "Staff not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(staff, { status: 200 });
  } catch (error) {
    console.error("Error fetching staff:", error);
    return NextResponse.json(
      { error: "Failed to fetch staff" },
      { status: 500 }
    );
  }
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const staffId = parseInt(id);

    // Check if staff exists
    const staff = await prisma.staff.findUnique({
      where: { staffid: staffId },
    });

    if (!staff) {
      return NextResponse.json(
        { error: "Staff not found" },
        { status: 404 }
      );
    }

    // Delete staff
    await prisma.staff.delete({
      where: { staffid: staffId },
    });

    return NextResponse.json({ message: "Staff deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting staff:", error);
    return NextResponse.json(
      { error: "Failed to delete staff" },
      { status: 500 }
    );
  }
}