import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Signed out");
    navigate("/");
  };

  const dashLink = !user
    ? "/login"
    : user.role === "admin"
      ? "/admin/dashboard"
      : user.role === "mentor"
        ? "/mentor/dashboard"
        : "/mentee/dashboard";

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/scholarship", label: "Scholarship" },
    { to: "/testimonials", label: "Testimonials" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg border-b border-gray-100" : "bg-white"}`}
    >
      {/* Top bar */}
      <div
        style={{ background: "#050E1F" }}
        className="text-xs py-1.5 px-6 hidden lg:flex justify-between text-gray-400"
      >
        <span className="font-medium">
          CybageKhushboo Charitable Trust — A CSR initiative of Cybage Software
          Pvt. Ltd.
        </span>
        <div className="flex gap-5">
          <a
            href="https://www.cybage.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition font-semibold"
          >
            Cybage.com
          </a>
          <a
            href="https://www.cybageasha.org"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition font-semibold"
          >
            CybageAsha
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          {/* Logo */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xs flex-shrink-0 overflow-hidden"
            style={{ background: "linear-gradient(135deg,#0055B3,#003D82)" }}
          >
            {logoError ? (
              <span>CK</span>
            ) : (
              <img
                src="https://www.cybagekhushboo.org/media/1133/khushboo-logo.png"
                alt="CK"
                className="w-full h-full object-cover"
                onError={() => setLogoError(true)}
              />
            )}
          </div>
          <div className="hidden sm:block">
            <p
              className="font-black text-ck-dark text-sm leading-tight"
              style={{ fontFamily: "Sora,sans-serif" }}
            >
              CybageKhushboo
            </p>
            <p className="text-xs text-ck-muted font-medium">
              MentorLink Portal
            </p>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${pathname === to ? "bg-ck-blue text-white shadow-blue" : "text-ck-text hover:text-ck-blue hover:bg-ck-blue-l"}`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              <Link to={dashLink} className="btn-secondary text-sm">
                My Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-ck-muted hover:text-red-500 font-semibold transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-ck-blue hover:bg-ck-blue-l px-4 py-2 rounded-xl transition"
              >
                Sign In
              </Link>
              <Link to="/scholarship" className="btn-primary text-sm">
                Apply Now
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2.5 rounded-xl text-ck-text hover:bg-ck-gray transition"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span
              className={`block h-0.5 bg-current rounded transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-0.5 bg-current rounded transition-all ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 bg-current rounded transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}
      >
        <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-semibold transition ${pathname === to ? "bg-ck-blue text-white" : "text-ck-text hover:bg-ck-gray"}`}
            >
              {label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 space-y-2">
            {user ? (
              <>
                <Link
                  to={dashLink}
                  onClick={() => setOpen(false)}
                  className="block btn-secondary text-center text-sm"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-red-500 py-2 font-semibold text-sm"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block btn-ghost text-center text-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/scholarship"
                  onClick={() => setOpen(false)}
                  className="block btn-primary text-center text-sm"
                >
                  Apply Now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
