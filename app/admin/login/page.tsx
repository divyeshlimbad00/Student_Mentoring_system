"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setError("");
    if (!email.trim()) { setError("Please enter your email."); return; }
    if (!password.trim()) { setError("Please enter your password."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/admin/dashboard");
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
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#EFF6FF] flex items-center justify-center p-4 font-sans relative overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-300/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-indigo-300/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="bg-white/70 backdrop-blur-2xl w-full max-w-sm rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-white p-10 relative z-10 transition-all hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-500/30 transform transition-transform hover:scale-105 ring-4 ring-white">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-1.5 font-medium">Student Mentoring System</p>
        </div>

        {error && (
          <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-600 text-sm font-semibold rounded-xl px-4 py-3 mb-6 shadow-sm flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
            <input
              type="email"
              placeholder="admin@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 disabled:bg-gray-50/50 transition-all shadow-sm backdrop-blur-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-widest mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 disabled:bg-gray-50/50 transition-all shadow-sm backdrop-blur-sm"
            />
          </div>
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3.5 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
          >
            {loading ? "Authenticating..." : "Secure Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
