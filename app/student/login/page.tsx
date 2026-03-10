"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StudentLogin() {
  const [enrollment, setEnrollment] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setError("");
    if (!enrollment.trim()) { setError("Please enter your enrollment number."); return; }
    if (!password.trim()) { setError("Please enter your password."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/student/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollment, password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push(`/student/${data.studentId}`);
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-green-400/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-emerald-400/10 rounded-full blur-[100px]" />
      
      <div className="bg-white/80 backdrop-blur-md w-full max-w-sm rounded-2xl shadow-xl border border-white/50 p-8 relative z-10 transition-all hover:shadow-2xl hover:bg-white">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Student Login</h1>
          <p className="text-gray-500 text-sm mt-1">Access your mentoring dashboard</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 text-sm rounded-md px-4 py-2 mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Number</label>
            <input
              type="text"
              placeholder="e.g. 220170107001"
              value={enrollment}
              onChange={(e) => setEnrollment(e.target.value)}
              disabled={loading}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50"
            />
          </div>
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
          <div className="text-center">
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
