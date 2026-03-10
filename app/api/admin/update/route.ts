import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { adminid, adminname, emailaddress, mobileno, password } = body;

    if (!adminid) {
      return NextResponse.json(
        { error: "Admin ID is required" },
        { status: 400 }
      );
    }

    const updatedAdmin = await prisma.admin.update({
      where: { adminid: parseInt(adminid) },
      data: {
        adminname,
        emailaddress,
        mobileno,
        password,
        modified: new Date(),
      },
    });

    return NextResponse.json(updatedAdmin, { status: 200 });
  } catch (error) {
    console.error("Error updating admin:", error);
    return NextResponse.json(
      { error: "Failed to update admin" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const adminid = searchParams.get("adminid");

    if (!adminid) {
      return NextResponse.json(
        { error: "Admin ID is required" },
        { status: 400 }
      );
    }

    await prisma.admin.delete({
      where: { adminid: parseInt(adminid) },
    });

    return NextResponse.json(
      { message: "Admin deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting admin:", error);
    return NextResponse.json(
      { error: "Failed to delete admin" },
      { status: 500 }
    );
  }
}
