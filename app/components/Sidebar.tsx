"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Dashboard", path: "/", icon: "🏠" },
  { label: "Admin", path: "/admin", icon: "🛠️" },
  { label: "Students", path: "/student", icon: "🎓" },
  { label: "Staff", path: "/staff", icon: "👨‍🏫" },
  { label: "Mentor", path: "/mentor", icon: "🧑‍🏫" },
  { label: "Student Mentor", path: "/studentmentor", icon: "🔗" },
  { label: "Mentoring Sessions", path: "/studentmentoring", icon: "📋" },
  { label: "Forms", path: "/form", icon: "📝" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="text-white flex flex-col justify-between shadow-lg"
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #4e54c8, #8f94fb)",
      }}
    >
      <div>
        {/* Logo / Header */}
        <div className="text-center py-6 border-b border-white/20">
          <h4 className="fw-bold text-white text-xl drop-shadow-lg">🎯 Mentoring App</h4>
        </div>

        {/* Menu Items */}
        <ul className="nav flex-column gap-2 mt-4 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`d-flex align-items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-white text-purple-700 font-semibold shadow"
                      : "text-white hover:bg-white/20 hover:text-white font-medium"
                  }`}
                >
                  <span
                    className={`p-2 rounded-full text-center ${
                      isActive ? "bg-purple-200 text-purple-700" : "bg-white/20"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="text-center text-white/80 py-4 border-t border-white/20">
        Logged in as <br />
        <strong>Staff</strong>
      </div>
    </aside>
  );
}
