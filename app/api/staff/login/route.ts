import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
     const { email, mobileNo } = await req.json();

    // Validate input
     if (!email || !mobileNo) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Find staff by email address
    const staff = await prisma.staff.findFirst({
      where: { 
        emailaddress: email.trim().toLowerCase(),
      },
    });

    if (!staff) {
      return NextResponse.json(
        { success: false, message: "Staff not found" },
        { status: 404 }
      );
    }


    // Verify mobile number
    if (staff.mobileno && staff.mobileno !== mobileNo.trim()) {
      return NextResponse.json(
        { success: false, message: "Mobile number does not match" },
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
