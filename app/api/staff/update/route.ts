import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { staffid, staffname, emailaddress, mobileno } = body;

    if (!staffid) {
      return NextResponse.json(
        { error: "Staff ID is required" },
        { status: 400 }
      );
    }

    const updatedStaff = await prisma.staff.update({
      where: { staffid: parseInt(staffid) },
      data: {
        staffname,
        emailaddress,
        mobileno,
        modified: new Date(),
      },
    });

    return NextResponse.json(updatedStaff, { status: 200 });
  } catch (error) {
    console.error("Error updating staff:", error);
    return NextResponse.json(
      { error: "Failed to update staff" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const staffid = searchParams.get("staffid");

    if (!staffid) {
      return NextResponse.json(
        { error: "Staff ID is required" },
        { status: 400 }
      );
    }

    await prisma.staff.delete({
      where: { staffid: parseInt(staffid) },
    });

    return NextResponse.json(
      { message: "Staff deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting staff:", error);
    return NextResponse.json(
      { error: "Failed to delete staff" },
      { status: 500 }
    );
  }
}
