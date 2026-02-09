import { redirect } from "next/navigation";

export default async function StudentPage() {
  // Direct access to /student not allowed
  redirect("/student/login");
}
