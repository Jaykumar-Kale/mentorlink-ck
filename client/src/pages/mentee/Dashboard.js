
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";
import toast from "react-hot-toast";

const MODULES_LIST = [
  "Introduction Call","Career Development","Communication Skills",
  "Interview Preparation","Technical Skills","Soft Skills",
  "Resume Building","Higher Education Guidance",
];

export default function MenteeDashboard() {
  const { user, updateUser } = useAuth();
  const [stats,   setStats]   = useState({ total:0, completed:0, upcoming:0, progress:0, completedTopics:[] });
  const [mentor,  setMentor]  = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [meRes, stRes] = await Promise.all([api.get("/auth/me"), api.get("/sessions/stats")]);
        updateUser(meRes.data.user);
        if (meRes.data.user.assignedMentor) setMentor(meRes.data.user.assignedMentor);
        setStats(stRes.data.stats);
      } catch { toast.error("Failed to load dashboard"); }
      setLoading(false);
    };
    load();
  }, []); // eslint-disable-line

  if (loading) return <DashboardLayout><div className="flex items-center justify-center h-64 text-ck-muted">Loading…</div></DashboardLayout>;

  return (
    <DashboardLayout>
      {/* Hero banner */}
      <div style={{background:"linear-gradient(135deg,#050E1F 0%,#0A1A3A 50%,#003D82 100%)"}}>
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-white">
            <p className="text-blue-300 text-sm font-semibold mb-1">Welcome back 👋</p>
            <h1 className="text-2xl font-black" style={{fontFamily:"Sora,sans-serif"}}>{user?.name}</h1>
            <p className="text-blue-300 text-sm mt-1">{user?.college} · {user?.year}</p>
          </div>
          <div className="flex gap-3">
            {!user?.needAnalysisCompleted && (
              <Link to="/mentee/need-analysis" className="btn-primary text-sm">Complete Need Analysis →</Link>
            )}
            <Link to="/mentee/sessions" className="btn-ghost-white text-sm">Schedule Session</Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Alerts */}
        {!user?.needAnalysisCompleted && (
          <div className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">📋</div>
            <div>
              <p className="font-bold text-amber-800 text-sm">Action Required — Complete Need Analysis Form</p>
              <p className="text-amber-700 text-xs mt-1">This mandatory form helps us match you with the right Cybage mentor.</p>
              <Link to="/mentee/need-analysis" className="inline-block mt-2 text-xs font-bold text-amber-700 border border-amber-300 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition">Fill Form Now →</Link>
            </div>
          </div>
        )}
        {user?.needAnalysisCompleted && !user?.isMatched && (
          <div className="flex items-start gap-4 bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">⏳</div>
            <div>
              <p className="font-bold text-blue-800 text-sm">Mentor Assignment in Progress</p>
              <p className="text-blue-700 text-xs mt-1">Your need analysis has been submitted. The CybageKhushboo team will assign your Cybage mentor soon.</p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label:"Total Sessions",    value:stats.total,     color:"bg-ck-blue text-white",    icon:"📅" },
            { label:"Completed",         value:stats.completed, color:"bg-green-600 text-white",  icon:"✅" },
            { label:"Upcoming",          value:stats.upcoming,  color:"bg-ck-orange text-white",  icon:"🔜" },
            { label:"Progress",          value:`${stats.progress}%`, color:"bg-ck-dark text-white", icon:"📊" },
          ].map(c => (
            <div key={c.label} className={`${c.color} rounded-2xl p-5 flex items-center justify-between`}>
              <div>
                <p className="text-2xl font-black" style={{fontFamily:"Sora,sans-serif"}}>{c.value}</p>
                <p className="text-xs mt-0.5 opacity-80 font-semibold">{c.label}</p>
              </div>
              <span className="text-3xl opacity-60">{c.icon}</span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="card-flat">
          <div className="flex justify-between items-center mb-3">
            <p className="font-bold text-ck-dark text-sm">Programme Progress</p>
            <span className="chip chip-blue text-xs">{stats.progress}% Complete</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{width:`${stats.progress}%`}}/>
          </div>
          <p className="text-xs text-ck-muted mt-2">Complete 8 sessions across any 4 modules (2 per module) to finish the programme.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mentor card */}
          {mentor ? (
            <div className="card-flat">
              <p className="text-xs font-black uppercase tracking-widest text-ck-orange mb-4">Your Cybage Mentor</p>
              <div className="flex items-center gap-4">
                <img
                  src={mentor.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&background=0066CC&color=fff&size=64&bold=true`}
                  alt={mentor.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-ck-blue-l"
                />
                <div>
                  <p className="font-black text-ck-dark text-base" style={{fontFamily:"Sora,sans-serif"}}>{mentor.name}</p>
                  <p className="text-ck-blue text-sm font-semibold">{mentor.designation || "Cybage Mentor"}</p>
                  <p className="text-ck-muted text-xs">{mentor.department}</p>
                  <a href={`mailto:${mentor.email}`} className="text-ck-orange text-xs font-semibold hover:underline mt-1 block">{mentor.email}</a>
                </div>
              </div>
              {mentor.languagesKnown?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {mentor.languagesKnown.map(l => <span key={l} className="chip chip-blue text-xs">{l}</span>)}
                  {mentor.expertise?.slice(0,2).map(e => <span key={e} className="chip chip-orange text-xs">{e}</span>)}
                </div>
              )}
              <Link to="/mentee/sessions" className="btn-secondary w-full justify-center mt-4 text-sm py-2.5">
                Schedule a Session →
              </Link>
            </div>
          ) : (
            <div className="card-flat flex flex-col items-center justify-center text-center py-8">
              <div className="w-16 h-16 bg-ck-blue-xl rounded-2xl flex items-center justify-center text-3xl mb-3">🤝</div>
              <p className="font-bold text-ck-dark">Awaiting Mentor Assignment</p>
              <p className="text-ck-muted text-xs mt-1">Complete your need analysis to get matched.</p>
            </div>
          )}

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { to:"/mentee/sessions",      label:"Sessions",      icon:"📅", desc:"Schedule & manage", color:"bg-ck-blue text-white" },
              { to:"/mentee/modules",        label:"Modules",       icon:"📚", desc:"Learning resources", color:"bg-ck-dark text-white" },
              { to:"/mentee/need-analysis",  label:"Need Analysis", icon:"📋", desc:user?.needAnalysisCompleted?"View form":"Submit form", color:"bg-ck-orange text-white" },
              { to:"/mentee/profile",        label:"Profile",       icon:"👤", desc:"Your information",   color:"bg-gray-700 text-white" },
            ].map(q => (
              <Link key={q.to} to={q.to}
                className={`${q.color} rounded-2xl p-4 flex flex-col justify-between min-h-24 transition-all hover:opacity-90 hover:-translate-y-0.5`}>
                <span className="text-2xl">{q.icon}</span>
                <div>
                  <p className="font-black text-sm" style={{fontFamily:"Sora,sans-serif"}}>{q.label}</p>
                  <p className="text-xs opacity-70">{q.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Module progress */}
        <div className="card-flat">
          <p className="font-black text-ck-dark mb-4 text-sm" style={{fontFamily:"Sora,sans-serif"}}>Session Topics Progress</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {MODULES_LIST.map(m => {
              const done = (stats.completedTopics || []).includes(m);
              return (
                <div key={m} className={`flex items-center gap-3 p-3 rounded-xl border ${done ? "border-green-200 bg-green-50" : "border-ck-gray-b bg-ck-gray"}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${done ? "bg-green-500 text-white" : "bg-white border border-ck-gray-b text-ck-muted"}`}>
                    {done ? "✓" : "○"}
                  </div>
                  <p className={`text-xs font-semibold ${done ? "text-green-700" : "text-ck-muted"}`}>{m}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
