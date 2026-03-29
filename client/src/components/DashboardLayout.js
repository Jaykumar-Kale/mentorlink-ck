import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const NAV = {
  mentee: [
    { to: "/mentee/dashboard",     label: "Dashboard",     icon: "⊞" },
    { to: "/mentee/modules",       label: "Modules",       icon: "◫" },
    { to: "/mentee/sessions",      label: "Sessions",      icon: "◷" },
    { to: "/mentee/need-analysis", label: "Need Analysis", icon: "◈" },
    { to: "/mentee/profile",       label: "Profile",       icon: "◉" },
  ],
  mentor: [
    { to: "/mentor/dashboard", label: "Dashboard",   icon: "⊞" },
    { to: "/mentor/scholars",  label: "My Scholars", icon: "◈" },
    { to: "/mentor/sessions",  label: "Sessions",    icon: "◷" },
    { to: "/mentor/profile",   label: "Profile",     icon: "◉" },
  ],
  admin: [
    { to: "/admin/dashboard", label: "Dashboard", icon: "⊞" },
    { to: "/admin/users",     label: "Users",     icon: "◈" },
    { to: "/admin/matching",  label: "Matching",  icon: "◫" },
    { to: "/admin/sessions",  label: "Sessions",  icon: "◷" },
    { to: "/admin/modules",   label: "Modules",   icon: "◉" },
  ],
};

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const navItems = NAV[user?.role] || NAV.mentee;
  const handleLogout = () => { logout(); toast.success("Signed out"); navigate("/"); };

  const avatar = user?.profilePhoto ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=0055B3&color=fff&size=40&bold=true&format=svg`;

  return (
    <div className="min-h-screen bg-ck-light">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-card sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 sm:px-6 h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0"
              style={{background:"linear-gradient(135deg,#0055B3,#003D82)"}}>
              {logoError ? (
                <span className="text-white font-black text-[11px]">CK</span>
              ) : (
                <img src="https://www.cybagekhushboo.org/media/1133/khushboo-logo.png" alt="CK"
                  className="w-full h-full object-cover"
                  onError={() => setLogoError(true)}
                />
              )}
            </div>
            <div className="hidden sm:block">
              <p className="font-black text-ck-dark text-sm" style={{fontFamily:"Sora,sans-serif"}}>CybageKhushboo</p>
              <p className="text-xs text-ck-muted">MentorLink</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ to, label, icon }) => (
              <Link key={to} to={to}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  pathname === to ? "bg-ck-blue text-white shadow-sm" : "text-ck-text hover:text-ck-blue hover:bg-ck-blue-l"
                }`}>
                <span className="text-base">{icon}</span>{label}
              </Link>
            ))}
          </nav>

          {/* User info */}
          <div className="flex items-center gap-3">
            <img src={avatar} alt="avatar" className="w-9 h-9 rounded-xl object-cover border-2 border-ck-blue-l"/>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-ck-dark leading-tight">{user?.name}</p>
              <p className="text-xs text-ck-orange font-bold capitalize">{user?.role}</p>
            </div>
            <button onClick={handleLogout} className="hidden sm:block text-xs text-ck-muted hover:text-red-500 font-semibold transition px-2">↩</button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-xl hover:bg-ck-gray">☰</button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-wrap gap-2">
            {navItems.map(({ to, label }) => (
              <Link key={to} to={to} onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition ${pathname === to ? "bg-ck-blue text-white" : "text-ck-text bg-ck-gray hover:text-ck-blue"}`}>
                {label}
              </Link>
            ))}
            <button onClick={handleLogout} className="px-3 py-2 rounded-xl text-xs font-bold text-red-500 bg-red-50">Sign Out</button>
          </div>
        )}
      </header>

      <main>{children}</main>
    </div>
  );
}
