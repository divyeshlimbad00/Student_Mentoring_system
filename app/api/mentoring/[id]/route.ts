import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const mentorshipId = parseInt(id);

    // Check if mentorship exists
    const mentorship = await prisma.studentmentor.findUnique({
      where: { studentmentorid: mentorshipId },
    });

    if (!mentorship) {
      return NextResponse.json(
        { error: "Mentorship not found" },
        { status: 404 }
      );
    }

    // Delete mentorship
    await prisma.studentmentor.delete({
      where: { studentmentorid: mentorshipId },
    });

    return NextResponse.json({ message: "Mentorship deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting mentorship:", error);
    return NextResponse.json(
      { error: "Failed to delete mentorship" },
      { status: 500 }
    );
  }
}
