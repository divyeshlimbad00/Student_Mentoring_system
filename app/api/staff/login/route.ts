import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
     const { identifier, password } = await req.json();

    // Validate input
     if (!identifier || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Find staff by email or mobile
    const staff = await prisma.staff.findFirst({
      where: {
        OR: [
          { emailaddress: identifier.trim().toLowerCase() },
          { mobileno: identifier.trim() }
        ]
      },
    });

    if (!staff) {
      return NextResponse.json(
        { success: false, message: "Staff not found" },
        { status: 404 }
      );
    }

    // Verify password
    if (staff.password !== password.trim()) {
      return NextResponse.json(
        { success: false, message: "Password is incorrect" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      staffId: staff.staffid,
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
