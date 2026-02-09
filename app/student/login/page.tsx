"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import Link from "next/link";

export default function StudentLogin() {
  const [enrollment, setEnrollment] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!enrollment) {
      alert("Enter enrollment number");
      return;
    }

    const res = await fetch("/api/student/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enrollment }),
    });

    const data = await res.json();

    if (data.success) {
      // ✅ Redirect using URL param (NO COOKIE)
      router.push(`/student/${data.studentId}`);
    } else {
      alert("Student not found");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <Card glass className="w-full max-w-md p-8 z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
            🎓
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Student Login</h1>
          <p className="text-slate-400 text-sm">Access your mentoring dashboard</p>
        </div>

        <div className="space-y-6">
          <Input
            label="Enrollment Number"
            placeholder="Enter Enrollment No"
            value={enrollment}
            onChange={(e) => setEnrollment(e.target.value)}
          />

          <Button fullWidth onClick={handleLogin} className="bg-green-600 hover:bg-green-700 shadow-green-500/25">
            Access Dashboard
          </Button>

          <div className="pt-4 text-center">
            <Link href="/" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
