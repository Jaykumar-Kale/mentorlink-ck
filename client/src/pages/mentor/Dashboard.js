
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";
import toast from "react-hot-toast";

export default function MentorDashboard() {
  const { user, updateUser } = useAuth();
  const [stats,   setStats]   = useState({ total:0, completed:0, upcoming:0 });
  const [scholars, setScholars] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [meRes, stRes] = await Promise.all([api.get("/auth/me"), api.get("/sessions/stats")]);
        updateUser(meRes.data.user);
        setScholars(meRes.data.user.assignedMentees || []);
        setStats(stRes.data.stats);
      } catch { toast.error("Failed to load data"); }
      setLoading(false);
    };
    load();
  }, []); // eslint-disable-line

  return (
    <DashboardLayout>
      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#050E1F 0%,#0A1A3A 50%,#003D82 100%)"}}>
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-white">
            <div className="chip chip-orange mb-2 text-xs">Cybage Volunteer Mentor</div>
            <h1 className="text-2xl font-black" style={{fontFamily:"Sora,sans-serif"}}>Welcome, {user?.name?.split(" ")[0]}!</h1>
            <p className="text-blue-300 text-sm mt-1">{user?.designation} · {user?.department}</p>
          </div>
          <div className="flex gap-3">
            <Link to="/mentor/sessions" className="btn-primary text-sm">Schedule Session</Link>
            <Link to="/mentor/scholars"  className="btn-ghost-white text-sm">View Scholars</Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {scholars.length === 0 && (
          <div className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <span className="text-2xl">⏳</span>
            <div>
              <p className="font-bold text-amber-800 text-sm">Awaiting Scholar Assignment</p>
              <p className="text-amber-700 text-xs mt-1">CybageKhushboo admin will assign scholars to you based on the matching algorithm.</p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { l:"My Scholars",    v:scholars.length, bg:"bg-ck-blue",   icon:"🎓" },
            { l:"Total Sessions", v:stats.total,     bg:"bg-ck-dark",   icon:"📅" },
            { l:"Completed",      v:stats.completed, bg:"bg-green-600", icon:"✅" },
            { l:"Upcoming",       v:stats.upcoming,  bg:"bg-ck-orange", icon:"🔜" },
          ].map(c=>(
            <div key={c.l} className={`${c.bg} text-white rounded-2xl p-5 flex items-center justify-between`}>
              <div>
                <p className="text-2xl font-black" style={{fontFamily:"Sora,sans-serif"}}>{c.v}</p>
                <p className="text-xs opacity-75 mt-0.5 font-semibold">{c.l}</p>
              </div>
              <span className="text-3xl opacity-50">{c.icon}</span>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Link to="/mentor/sessions" className="card p-5 flex items-center gap-4 hover:shadow-blue transition group">
            <div className="w-14 h-14 bg-ck-blue rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">📅</div>
            <div>
              <p className="font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>Sessions</p>
              <p className="text-ck-muted text-xs mt-0.5">Schedule & track mentoring sessions</p>
            </div>
            <span className="ml-auto text-ck-blue font-black group-hover:translate-x-1 transition">→</span>
          </Link>
          <Link to="/mentor/scholars" className="card p-5 flex items-center gap-4 hover:shadow-orange transition group">
            <div className="w-14 h-14 bg-ck-orange rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">👥</div>
            <div>
              <p className="font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>My Scholars</p>
              <p className="text-ck-muted text-xs mt-0.5">View scholar profiles and need analysis</p>
            </div>
            <span className="ml-auto text-ck-orange font-black group-hover:translate-x-1 transition">→</span>
          </Link>
        </div>

        {/* Scholar list */}
        {scholars.length > 0 && (
          <div className="card-flat">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>Assigned Scholars</h3>
              <Link to="/mentor/scholars" className="text-xs font-bold text-ck-blue hover:underline">View all →</Link>
            </div>
            <div className="space-y-3">
              {scholars.slice(0,3).map(s=>(
                <div key={s._id} className="flex items-center gap-3 p-3 rounded-xl bg-ck-gray hover:bg-ck-blue-xl transition">
                  <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=0066CC&color=fff&size=40&bold=true`}
                    alt={s.name} className="w-10 h-10 rounded-xl object-cover"/>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-ck-dark text-sm">{s.name}</p>
                    <p className="text-ck-muted text-xs">{s.college} · {s.year}</p>
                  </div>
                  <a href={`mailto:${s.email}`} className="chip chip-blue text-xs">{s.email}</a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mentor profile summary */}
        <div className="card-flat">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>Your Profile Summary</h3>
            <Link to="/mentor/profile" className="text-xs font-bold text-ck-blue hover:underline">Edit →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            {[
              {l:"Department",v:user?.department},
              {l:"Designation",v:user?.designation},
              {l:"Years at Cybage",v:user?.yearsAtCybage?`${user.yearsAtCybage} years`:null},
              {l:"Employee ID",v:user?.employeeId},
            ].map(f=>(
              <div key={f.l}>
                <p className="text-xs text-ck-muted font-semibold uppercase tracking-wide mb-0.5">{f.l}</p>
                <p className="font-bold text-ck-dark">{f.v||<span className="text-ck-muted font-normal italic">—</span>}</p>
              </div>
            ))}
          </div>
          {user?.expertise?.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-ck-muted font-semibold uppercase tracking-wide mb-2">Expertise</p>
              <div className="flex flex-wrap gap-2">
                {user.expertise.map(e=><span key={e} className="chip chip-orange text-xs">{e}</span>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
