import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Find admin by email address
    const admin = await prisma.admin.findFirst({
      where: { 
        emailaddress: email.trim().toLowerCase(),
      },
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: 404 }
      );
    }

    // Verify password
    if (admin.password !== password.trim()) {
      return NextResponse.json(
        { success: false, message: "Password is incorrect" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      adminId: admin.adminid,
      adminname: admin.adminname,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during login" },
      { status: 500 }
    );
  }
}
