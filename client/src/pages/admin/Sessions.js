
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../utils/api";
import toast from "react-hot-toast";

export default function AdminSessions() {
  const [sessions, setSessions] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState("");

  useEffect(() => {
    api.get("/admin/sessions")
      .then(r => setSessions(r.data.sessions))
      .catch(() => toast.error("Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter ? sessions.filter(s=>s.status===filter) : sessions;
  const counts = { all:sessions.length, upcoming:sessions.filter(s=>s.status==="upcoming").length, completed:sessions.filter(s=>s.status==="completed").length, cancelled:sessions.filter(s=>s.status==="cancelled").length };

  return (
    <DashboardLayout>
      <div className="page-hero">
        <h1 className="text-4xl font-black text-white" style={{fontFamily:"Sora,sans-serif"}}>All Sessions</h1>
        <p className="text-blue-300 text-sm mt-2">Admin › Sessions ({sessions.length} total)</p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        <div className="grid grid-cols-4 gap-3">
          {[["All","all","bg-ck-dark"],["Upcoming","upcoming","bg-ck-blue"],["Completed","completed","bg-green-600"],["Cancelled","cancelled","bg-red-500"]].map(([l,k,bg])=>(
            <button key={k} onClick={()=>setFilter(k==="all"?"":k)}
              className={`${bg} text-white rounded-2xl p-4 text-center transition hover:opacity-90 ${(filter===k||(k==="all"&&!filter))?"ring-2 ring-offset-2 ring-current":""}`}>
              <p className="text-2xl font-black" style={{fontFamily:"Sora,sans-serif"}}>{counts[k]||0}</p>
              <p className="text-xs font-semibold mt-0.5 opacity-80">{l}</p>
            </button>
          ))}
        </div>
        {loading ? <div className="card-flat flex justify-center py-10 text-ck-muted">Loading…</div> : (
          <div className="bg-white rounded-2xl border border-ck-gray-b shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full data-table">
                <thead><tr>{["Topic","Mentor","Scholar","Status","Date","Time","Link"].map(h=><th key={h}>{h}</th>)}</tr></thead>
                <tbody>
                  {filtered.length===0 ? <tr><td colSpan={7} className="text-center py-10 text-ck-muted">No sessions found</td></tr>
                  : filtered.map(s=>(
                    <tr key={s._id}>
                      <td className="font-semibold text-ck-dark text-sm max-w-40 truncate">{s.topic}</td>
                      <td className="text-ck-muted text-sm">{s.mentor?.name}</td>
                      <td className="text-ck-muted text-sm">{s.mentee?.name}</td>
                      <td><span className={`status-${s.status}`}>{s.status.charAt(0).toUpperCase()+s.status.slice(1)}</span></td>
                      <td className="text-ck-muted text-sm whitespace-nowrap">{new Date(s.date).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</td>
                      <td className="text-ck-muted text-sm">{s.startTime||"—"}</td>
                      <td>{s.meetingLink?<a href={s.meetingLink} target="_blank" rel="noreferrer" className="chip chip-blue text-xs">Join</a>:<span className="text-ck-muted text-xs">—</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
