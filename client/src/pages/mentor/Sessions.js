
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../utils/api";
import toast from "react-hot-toast";

const TOPICS = ["Introduction Call","Career Development","Communication Skills","Interview Preparation","Technical Skills","Soft Skills","Resume Building","Higher Education Guidance","Other"];
const DURATIONS = [{v:"30",l:"30 min"},{v:"45",l:"45 min"},{v:"60",l:"1 hour"},{v:"90",l:"1.5 hours"},{v:"120",l:"2 hours"}];

export default function MentorSessions() {
  const [sessions, setSessions] = useState([]);
  const [scholars, setScholars] = useState([]);
  const [stats,    setStats]    = useState({ total:0, completed:0, upcoming:0 });
  const [loading,  setLoading]  = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving,   setSaving]   = useState(false);
  const [form, setForm] = useState({ topic:"", date:"", startTime:"", duration:"60", meetingLink:"", agenda:"", menteeId:"" });

  useEffect(() => {
    const load = async () => {
      try {
        const [sR, stR, meR] = await Promise.all([api.get("/sessions"), api.get("/sessions/stats"), api.get("/auth/me")]);
        setSessions(sR.data.sessions); setStats(stR.data.stats);
        setScholars(meR.data.user.assignedMentees || []);
      } catch { toast.error("Failed to load"); }
      setLoading(false);
    };
    load();
  }, []);

  const calcEnd = () => {
    if (!form.startTime||!form.duration) return "—";
    const [h,m]=form.startTime.split(":").map(Number);
    const t=h*60+m+Number(form.duration);
    return `${String(Math.floor(t/60)%24).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`;
  };

  const createSession = async e => {
    e.preventDefault(); setSaving(true);
    try {
      const r = await api.post("/sessions", form);
      setSessions(p=>[r.data.session,...p]);
      toast.success("Session scheduled!");
      setShowForm(false);
      setForm({topic:"",date:"",startTime:"",duration:"60",meetingLink:"",agenda:"",menteeId:""});
    } catch(err) { toast.error(err.response?.data?.message||"Failed"); }
    setSaving(false);
  };

  const markDone = async id => {
    try {
      const r = await api.put(`/sessions/${id}/status`,{status:"completed"});
      setSessions(p=>p.map(s=>s._id===id?r.data.session:s));
      toast.success("Session marked complete!");
    } catch { toast.error("Failed"); }
  };

  return (
    <DashboardLayout>
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-ck-gray-b">
              <h2 className="font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>Schedule New Session</h2>
              <button onClick={()=>setShowForm(false)} className="w-8 h-8 rounded-xl bg-ck-gray flex items-center justify-center text-ck-muted hover:bg-gray-200">✕</button>
            </div>
            <form onSubmit={createSession} className="p-6 space-y-4">
              <div>
                <label className="form-label">Select Scholar *</label>
                <select required className="form-input" value={form.menteeId} onChange={e=>setForm({...form,menteeId:e.target.value})}>
                  <option value="">Select scholar</option>
                  {scholars.map(s=><option key={s._id} value={s._id}>{s.name} — {s.college}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Session Topic *</label>
                <select required className="form-input" value={form.topic} onChange={e=>setForm({...form,topic:e.target.value})}>
                  <option value="">Select topic</option>
                  {TOPICS.map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="form-label">Date *</label>
                  <input type="date" required className="form-input" value={form.date} min={new Date().toISOString().split("T")[0]}
                    onChange={e=>setForm({...form,date:e.target.value})}/>
                </div>
                <div><label className="form-label">Start Time *</label>
                  <input type="time" required className="form-input" value={form.startTime} onChange={e=>setForm({...form,startTime:e.target.value})}/>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="form-label">Duration</label>
                  <select className="form-input" value={form.duration} onChange={e=>setForm({...form,duration:e.target.value})}>
                    {DURATIONS.map(d=><option key={d.v} value={d.v}>{d.l}</option>)}
                  </select>
                </div>
                <div className="flex items-end">
                  <div className="bg-ck-blue-xl rounded-xl px-3 py-2.5 w-full text-sm text-ck-blue font-semibold">End: {calcEnd()}</div>
                </div>
              </div>
              <div><label className="form-label">Meeting Link</label>
                <input type="url" className="form-input" value={form.meetingLink} placeholder="https://meet.google.com/..."
                  onChange={e=>setForm({...form,meetingLink:e.target.value})}/>
              </div>
              <div><label className="form-label">Agenda / Notes</label>
                <textarea rows={3} className="form-input" style={{resize:"vertical"}} value={form.agenda}
                  onChange={e=>setForm({...form,agenda:e.target.value})} placeholder="Session plan..."/>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={()=>setShowForm(false)} className="flex-1 py-3 border border-ck-gray-b rounded-xl text-ck-muted font-bold text-sm">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 btn-primary justify-center py-3 disabled:opacity-60">
                  {saving?"Scheduling...":"Schedule →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="page-hero">
        <h1 className="text-4xl font-black text-white" style={{fontFamily:"Sora,sans-serif"}}>Sessions</h1>
        <p className="text-blue-300 text-sm mt-2">Mentor › All Sessions</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="grid grid-cols-3 gap-4">
            {[{l:"Total",v:stats.total,bg:"bg-ck-dark"},{l:"Completed",v:stats.completed,bg:"bg-green-600"},{l:"Upcoming",v:stats.upcoming,bg:"bg-ck-blue"}].map(c=>(
              <div key={c.l} className={`${c.bg} text-white rounded-2xl px-5 py-4 text-center`}>
                <p className="text-xl font-black" style={{fontFamily:"Sora,sans-serif"}}>{c.v}</p>
                <p className="text-xs opacity-75 font-semibold">{c.l}</p>
              </div>
            ))}
          </div>
          <button onClick={()=>setShowForm(true)} className="btn-primary">+ New Session</button>
        </div>

        {loading ? <div className="card-flat flex justify-center py-10 text-ck-muted">Loading…</div>
        : sessions.length === 0 ? (
          <div className="card-flat flex flex-col items-center justify-center py-16 text-center">
            <div className="text-5xl mb-3">📅</div>
            <p className="font-bold text-ck-dark">No sessions yet</p>
            <p className="text-ck-muted text-sm mt-1">Schedule your first session with a scholar!</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-ck-gray-b shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full data-table">
                <thead><tr>{["Topic","Scholar","Status","Date","Time","Link","Action"].map(h=><th key={h}>{h}</th>)}</tr></thead>
                <tbody>
                  {sessions.map(s=>(
                    <tr key={s._id}>
                      <td><p className="font-semibold text-ck-dark text-sm">{s.topic}</p></td>
                      <td><p className="text-ck-muted text-sm">{s.mentee?.name}</p></td>
                      <td><span className={`status-${s.status}`}>{s.status.charAt(0).toUpperCase()+s.status.slice(1)}</span></td>
                      <td className="text-ck-muted text-sm whitespace-nowrap">{new Date(s.date).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</td>
                      <td className="text-ck-muted text-sm">{s.startTime||"—"}</td>
                      <td>{s.meetingLink?<a href={s.meetingLink} target="_blank" rel="noreferrer" className="chip chip-blue text-xs">Join →</a>:<span className="text-ck-muted text-xs">—</span>}</td>
                      <td>{s.status==="upcoming"&&<button onClick={()=>markDone(s._id)} className="chip chip-green text-xs cursor-pointer hover:bg-green-500 hover:text-white transition">Mark Done</button>}</td>
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
