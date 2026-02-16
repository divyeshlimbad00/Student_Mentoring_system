import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import StudentMentoringForm from "./StudentMentoringForm";

export async function saveMentoring(formData: FormData) {
  "use server";

  const studentmentorid = Number(formData.get("studentmentorid"));
  const studentmentoringid = formData.get("studentmentoringid");

  if (studentmentoringid) {
    // UPDATE
    await prisma.studentmentoring.update({
      where: {
        studentmentoringid: Number(studentmentoringid),
      },
      data: {
        dateofmentoring: formData.get("dateofmentoring") ? new Date(formData.get("dateofmentoring") as string) : null,
        scheduledmeetingdate: formData.get("scheduledmeetingdate") ? new Date(formData.get("scheduledmeetingdate") as string) : null,
        nextmentoringdate: formData.get("nextmentoringdate") ? new Date(formData.get("nextmentoringdate") as string) : null,
        issuesdiscussed: formData.get("issuesdiscussed") as string,
        mentoringmeetingagenda: formData.get("mentoringmeetingagenda") as string,
        absentremarks: formData.get("absentremarks") as string,
        isparentpresent: formData.get("isparentpresent") === "on",
        parentname: formData.get("parentname") as string,
        parentmobileno: formData.get("parentmobileno") as string,
        parentsopinion: formData.get("parentsopinion") as string,
        studentsopinion: formData.get("studentsopinion") as string,
        staffopinion: formData.get("staffopinion") as string,
        stresslevel: formData.get("stresslevel") as string,
        learnertype: formData.get("learnertype") as string,
        modified: new Date(),
      },
    });
  } else {
    // CREATE
    await prisma.studentmentoring.create({
      data: {
        studentmentorid,
        dateofmentoring: formData.get("dateofmentoring") ? new Date(formData.get("dateofmentoring") as string) : null,
        scheduledmeetingdate: formData.get("scheduledmeetingdate") ? new Date(formData.get("scheduledmeetingdate") as string) : null,
        nextmentoringdate: formData.get("nextmentoringdate") ? new Date(formData.get("nextmentoringdate") as string) : null,
        issuesdiscussed: formData.get("issuesdiscussed") as string,
        mentoringmeetingagenda: formData.get("mentoringmeetingagenda") as string,
        absentremarks: formData.get("absentremarks") as string,
        isparentpresent: formData.get("isparentpresent") === "on",
        parentname: formData.get("parentname") as string,
        parentmobileno: formData.get("parentmobileno") as string,
        parentsopinion: formData.get("parentsopinion") as string,
        studentsopinion: formData.get("studentsopinion") as string,
        staffopinion: formData.get("staffopinion") as string,
        stresslevel: formData.get("stresslevel") as string,
        learnertype: formData.get("learnertype") as string,
      },
    });
  }

  // determine staff id from the studentmentor relation so we can redirect
  const sm = await prisma.studentmentor.findUnique({
    where: { studentmentorid },
  });
  const staffId = sm?.staffid;

  if (staffId) {
    revalidatePath(`/staff/${staffId}`);
    redirect(`/staff/${staffId}`);
  }

  // fallback to general staff page
  revalidatePath("/staff");
  redirect("/staff");
}

async function MentoringPage({
  params,
}: {
  params: Promise<{ studentmentorid: string }>;
}) {
  const { studentmentorid } = await params;
  const smId = Number(studentmentorid);

  const mentoring = await prisma.studentmentoring.findFirst({
    where: { studentmentorid: smId },
    include: {
      studentmentor: {
        include: {
          student: true,
          staff: true,
        },
      },
    },
  });

  // if no mentoring record yet (creating new), fetch the studentmentor to get staff id
  let staffId: number | null = null;
  if (mentoring?.studentmentor?.staffid) {
    staffId = mentoring.studentmentor.staffid;
  } else {
    const sm = await prisma.studentmentor.findUnique({
      where: { studentmentorid: smId },
    });
    staffId = sm?.staffid ?? null;
  }

  return (
    <StudentMentoringForm
      studentmentorid={smId}
      existingMentoring={mentoring}
      action={saveMentoring}
      staffId={staffId ?? undefined}
    />
  );
}

export default MentoringPage;
