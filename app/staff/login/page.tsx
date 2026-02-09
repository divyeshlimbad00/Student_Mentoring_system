"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import Link from "next/link";

export default function StaffLogin() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    const res = await fetch("/api/staff/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.success) {
      router.push(`/staff/${data.staffId}`);
    } else {
      setError("Staff not found. Please check your email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px]" />
      </div>

      <Card glass className="w-full max-w-md p-8 z-10 border-blue-200">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
            👨‍🏫
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Staff Login</h1>
          <p className="text-slate-500 text-sm">Access your mentoring dashboard</p>
        </div>

        <div className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="staff@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
          />

          <Button fullWidth onClick={handleLogin}>
            Login to Dashboard
          </Button>

          <div className="text-center mt-2">
            <p className="text-xs text-slate-500 mb-4">Authorized staff only</p>
            <Link href="/" className="text-slate-500 hover:text-slate-700 text-sm transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
