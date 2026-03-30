import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../utils/api";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/stats")
      .then((r) => setStats(r.data.stats))
      .catch(() => toast.error("Failed to load stats"))
      .finally(() => setLoading(false));
  }, []);

  // Icons =💼, 🎓, 🤝, ⚠, 📋, ✅,👥,🔗,📚,
  const CARDS = [
    {
      l: "Cybage Mentors",
      v: stats.mentors,
      icon: "",
      bg: "bg-ck-blue",
      to: "/admin/users?role=mentor",
    },
    {
      l: "CK Scholars",
      v: stats.mentees,
      icon: "",
      bg: "bg-ck-orange",
      to: "/admin/users?role=mentee",
    },
    {
      l: "Matched Pairs",
      v: stats.matched,
      icon: "",
      bg: "bg-green-600",
      to: "/admin/matching",
    },
    {
      l: "Unmatched Scholars",
      v: stats.unmatched,
      icon: "",
      bg: "bg-red-500",
      to: "/admin/matching",
    },
    {
      l: "Need Analysis Done",
      v: stats.needDone,
      icon: "",
      bg: "bg-purple-600",
      to: "/admin/users",
    },
    {
      l: "Sessions Completed",
      v: stats.completed,
      icon: "",
      bg: "bg-teal-600",
      to: "/admin/sessions",
    },
  ];

  const QUICK = [
    {
      to: "/admin/users",
      l: "Manage Users",
      icon: "",
      desc: "Add, edit, manage mentors & scholars",
    },
    {
      to: "/admin/matching",
      l: "Run Matching",
      icon: "",
      desc: "Auto-match or manually assign pairs",
    },
    {
      to: "/admin/sessions",
      l: "All Sessions",
      icon: "📅",
      desc: "Monitor all mentoring sessions",
    },
    {
      to: "/admin/modules",
      l: "Learning Modules",
      icon: "",
      desc: "Upload PPT/PDF learning materials",
    },
  ];

  return (
    <DashboardLayout>
      <div
        style={{
          background:
            "linear-gradient(135deg,#050E1F 0%,#0A1A3A 50%,#003370 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="chip chip-orange mb-3">
            CybageKhushboo MentorLink Admin
          </div>
          <h1
            className="text-2xl font-black text-white"
            style={{ fontFamily: "Sora,sans-serif" }}
          >
            Programme Dashboard
          </h1>
          <p className="text-blue-300 text-sm mt-1">
            Monitor and manage the CybageKhushboo mentorship programme
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {loading ? (
          <div className="text-center py-10 text-ck-muted">Loading stats…</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {CARDS.map((c) => (
              <Link
                key={c.l}
                to={c.to}
                className={`${c.bg} text-white rounded-2xl p-5 flex items-center justify-between hover:opacity-90 transition`}
              >
                <div>
                  <p
                    className="text-3xl font-black"
                    style={{ fontFamily: "Sora,sans-serif" }}
                  >
                    {c.v ?? "—"}
                  </p>
                  <p className="text-xs opacity-75 mt-1 font-semibold">{c.l}</p>
                </div>
                <span className="text-3xl opacity-60">{c.icon}</span>
              </Link>
            ))}
          </div>
        )}

        {stats.unmatched > 0 && (
          <div className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-bold text-amber-800 text-sm">
                {stats.unmatched} scholar(s) not yet matched
              </p>
              <p className="text-amber-700 text-xs mt-1">
                Run the auto-matching algorithm or assign manually.
              </p>
              <Link
                to="/admin/matching"
                className="inline-block mt-2 text-xs font-bold text-amber-700 border border-amber-300 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition"
              >
                Go to Matching →
              </Link>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {QUICK.map((q) => (
            <Link
              key={q.to}
              to={q.to}
              className="card p-5 flex items-center gap-4 group"
            >
              <div className="w-14 h-14 bg-ck-blue-xl rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-ck-blue group-hover:text-white transition-all">
                {q.icon}
              </div>
              <div>
                <p
                  className="font-black text-ck-dark"
                  style={{ fontFamily: "Sora,sans-serif" }}
                >
                  {q.l}
                </p>
                <p className="text-ck-muted text-xs mt-0.5">{q.desc}</p>
              </div>
              <span className="ml-auto text-ck-muted group-hover:text-ck-blue group-hover:translate-x-1 transition-all font-black">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
