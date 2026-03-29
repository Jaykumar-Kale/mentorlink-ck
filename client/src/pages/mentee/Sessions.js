
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../utils/api";
import toast from "react-hot-toast";

const TOPICS = ["Introduction Call","Career Development","Communication Skills","Interview Preparation","Technical Skills","Soft Skills","Resume Building","Higher Education Guidance","Other"];
const DURATIONS = [{v:"30",l:"30 min"},{v:"45",l:"45 min"},{v:"60",l:"1 hour"},{v:"90",l:"1.5 hours"},{v:"120",l:"2 hours"}];

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-ck-gray-b">
          <h2 className="text-base font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>{title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-ck-gray flex items-center justify-center text-ck-muted hover:bg-gray-200 transition text-sm font-bold">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function ScheduleForm({ onClose, onCreated }) {
  const [f, setF] = useState({ topic:"", date:"", startTime:"", duration:"60", meetingLink:"", agenda:"" });
  const [loading, setLoading] = useState(false);
  const calcEnd = () => {
    if (!f.startTime || !f.duration) return "—";
    const [h,m] = f.startTime.split(":").map(Number);
    const t = h*60+m+Number(f.duration);
    return `${String(Math.floor(t/60)%24).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`;
  };
  const submit = async e => {
    e.preventDefault(); setLoading(true);
    try { const r = await api.post("/sessions",f); toast.success("Session scheduled!"); onCreated(r.data.session); onClose(); }
    catch(err) { toast.error(err.response?.data?.message||"Failed to schedule"); }
    setLoading(false);
  };
  return (
    <form onSubmit={submit} className="space-y-4">
      <div><label className="form-label">Session Topic *</label>
        <select required className="form-input" value={f.topic} onChange={e=>setF({...f,topic:e.target.value})}>
          <option value="">Select topic</option>
          {TOPICS.map(t=><option key={t}>{t}</option>)}
        </select>
      </div>
      <div><label className="form-label">Date *</label>
        <input type="date" required className="form-input" value={f.date} min={new Date().toISOString().split("T")[0]}
          onChange={e=>setF({...f,date:e.target.value})}/>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="form-label">Start Time *</label>
          <input type="time" required className="form-input" value={f.startTime} onChange={e=>setF({...f,startTime:e.target.value})}/>
        </div>
        <div><label className="form-label">Duration</label>
          <select className="form-input" value={f.duration} onChange={e=>setF({...f,duration:e.target.value})}>
            {DURATIONS.map(d=><option key={d.v} value={d.v}>{d.l}</option>)}
          </select>
        </div>
      </div>
      <div className="bg-ck-blue-xl rounded-xl p-3 text-sm text-ck-blue font-semibold">
        End time: <span className="font-black">{calcEnd()}</span>
      </div>
      <div><label className="form-label">Google Meet / Zoom Link</label>
        <input type="url" className="form-input" value={f.meetingLink} placeholder="https://meet.google.com/..."
          onChange={e=>setF({...f,meetingLink:e.target.value})}/>
      </div>
      <div><label className="form-label">Session Notes / Agenda</label>
        <textarea rows={3} className="form-input" style={{resize:"vertical"}} value={f.agenda}
          onChange={e=>setF({...f,agenda:e.target.value})} placeholder="Topics to discuss..."/>
      </div>
      <div className="flex gap-3 pt-1">
        <button type="button" onClick={onClose} className="flex-1 py-3 border border-ck-gray-b rounded-xl text-ck-muted font-bold text-sm hover:bg-ck-gray transition">Cancel</button>
        <button type="submit" disabled={loading} className="flex-1 btn-primary justify-center py-3 disabled:opacity-60">
          {loading?"Scheduling...":"Schedule Session →"}
        </button>
      </div>
    </form>
  );
}

function FeedbackForm({ session, onClose, onUpdated }) {
  const [rating, setRating] = useState(5);
  const [summary, setSummary] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async e => {
    e.preventDefault(); setLoading(true);
    try {
      const r = await api.put(`/sessions/${session._id}/status`,{ status:"completed", menteeRating:rating, summary, menteeFeedback:feedback });
      toast.success("Feedback submitted!"); onUpdated(r.data.session); onClose();
    } catch { toast.error("Failed"); }
    setLoading(false);
  };
  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="bg-ck-gray rounded-xl p-3">
        <p className="font-bold text-ck-dark text-sm">{session.topic}</p>
        <p className="text-ck-muted text-xs">{new Date(session.date).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</p>
      </div>
      <div>
        <label className="form-label">Rate this session</label>
        <div className="flex gap-2">
          {[1,2,3,4,5].map(n=>(
            <button key={n} type="button" onClick={()=>setRating(n)}
              className={`flex-1 py-2.5 rounded-xl font-black text-sm transition ${rating>=n?"bg-ck-orange text-white shadow-orange":"bg-ck-gray text-ck-muted hover:bg-ck-gray-b"}`}>
              {n}★
            </button>
          ))}
        </div>
      </div>
      <div><label className="form-label">Session Summary</label>
        <textarea rows={3} className="form-input" style={{resize:"vertical"}} value={summary}
          onChange={e=>setSummary(e.target.value)} placeholder="What was discussed?"/>
      </div>
      <div><label className="form-label">Your Feedback</label>
        <textarea rows={3} className="form-input" style={{resize:"vertical"}} value={feedback}
          onChange={e=>setFeedback(e.target.value)} placeholder="How was your experience?"/>
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={onClose} className="flex-1 py-3 border border-ck-gray-b rounded-xl text-ck-muted font-bold text-sm">Cancel</button>
        <button type="submit" disabled={loading} className="flex-1 btn-secondary justify-center py-3 disabled:opacity-60">
          {loading?"Submitting...":"Submit Feedback →"}
        </button>
      </div>
    </form>
  );
}

export default function MenteeSessions() {
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({ total:0, completed:0, upcoming:0, cancelled:0, progress:0 });
  const [loading, setLoading] = useState(true);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [feedbackSession, setFeedbackSession] = useState(null);

  const load = async () => {
    try {
      const [sR, stR] = await Promise.all([api.get("/sessions"), api.get("/sessions/stats")]);
      setSessions(sR.data.sessions); setStats(stR.data.stats);
    } catch { toast.error("Failed to load sessions"); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  return (
    <DashboardLayout>
      {scheduleOpen && <Modal title="Schedule New Session" onClose={()=>setScheduleOpen(false)}>
        <ScheduleForm onClose={()=>setScheduleOpen(false)} onCreated={s=>setSessions(p=>[s,...p])}/>
      </Modal>}
      {feedbackSession && <Modal title="Session Feedback" onClose={()=>setFeedbackSession(null)}>
        <FeedbackForm session={feedbackSession} onClose={()=>setFeedbackSession(null)}
          onUpdated={s=>setSessions(p=>p.map(x=>x._id===s._id?s:x))}/>
      </Modal>}

      <div className="page-hero">
        <h1 className="text-4xl font-black text-white" style={{fontFamily:"Sora,sans-serif"}}>Sessions</h1>
        <p className="text-blue-300 text-sm mt-2">Scholar › All Sessions</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Stats + Schedule */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {l:"Total Created",v:stats.total,bg:"bg-ck-dark"},
            {l:"Completed",v:stats.completed,bg:"bg-green-600"},
            {l:"Upcoming",v:stats.upcoming,bg:"bg-ck-blue"},
            {l:"Programme",v:`${stats.progress}%`,bg:"bg-ck-orange"},
          ].map(c=>(
            <div key={c.l} className={`${c.bg} text-white rounded-2xl p-5 text-center`}>
              <p className="text-2xl font-black" style={{fontFamily:"Sora,sans-serif"}}>{c.v}</p>
              <p className="text-xs opacity-75 mt-1 font-semibold">{c.l}</p>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="card-flat">
          <div className="flex justify-between items-center mb-3">
            <p className="font-bold text-ck-dark text-sm">Programme Completion</p>
            <span className="chip chip-blue">{stats.progress}% Complete</span>
          </div>
          <div className="progress-track"><div className="progress-fill" style={{width:`${stats.progress}%`}}/></div>
          <p className="text-xs text-ck-muted mt-2">8 sessions across 4 modules = 100% completion</p>
        </div>

        {/* Schedule + upcoming */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="card-flat flex flex-col items-center justify-center text-center py-8">
            <div className="w-16 h-16 bg-ck-blue rounded-2xl flex items-center justify-center text-3xl mb-4">📅</div>
            <h3 className="font-black text-ck-dark mb-3" style={{fontFamily:"Sora,sans-serif"}}>Schedule A Session</h3>
            <button onClick={()=>setScheduleOpen(true)} className="btn-primary text-sm">
              + New Session
            </button>
          </div>
          <div className="card-flat flex flex-col items-center justify-center text-center py-8">
            <div className="w-20 h-20 rounded-full border-4 border-ck-blue-l flex items-center justify-center mb-3">
              <p className="text-3xl font-black text-ck-blue" style={{fontFamily:"Sora,sans-serif"}}>{stats.upcoming}</p>
            </div>
            <p className="font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>Upcoming Sessions</p>
            <p className="text-ck-muted text-xs mt-1">Sessions confirmed with your mentor</p>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="card-flat flex items-center justify-center py-16 text-ck-muted">Loading sessions…</div>
        ) : sessions.length === 0 ? (
          <div className="card-flat flex flex-col items-center justify-center py-16 text-center">
            <div className="text-5xl mb-3">📭</div>
            <p className="font-bold text-ck-dark">No sessions yet</p>
            <p className="text-ck-muted text-sm mt-1">Schedule your first session with your Cybage mentor!</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-ck-gray-b shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full data-table">
                <thead><tr>
                  {["Topic","Status","Date","Start","End","Link","Action"].map(h=>(
                    <th key={h} className="text-left">{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {sessions.map(s=>(
                    <tr key={s._id}>
                      <td>
                        <p className="font-semibold text-ck-dark text-sm">{s.topic}</p>
                        {s.mentor && <p className="text-ck-muted text-xs">with {s.mentor.name}</p>}
                      </td>
                      <td><span className={`status-${s.status}`}>{s.status.charAt(0).toUpperCase()+s.status.slice(1)}</span></td>
                      <td className="text-ck-muted text-sm whitespace-nowrap">
                        {new Date(s.date).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}
                      </td>
                      <td className="text-ck-muted text-sm">{s.startTime||"—"}</td>
                      <td className="text-ck-muted text-sm">{s.endTime||"—"}</td>
                      <td>
                        {s.meetingLink
                          ? <a href={s.meetingLink} target="_blank" rel="noreferrer" className="chip chip-blue text-xs hover:bg-ck-blue hover:text-white transition">Join →</a>
                          : <span className="text-ck-muted text-xs">—</span>}
                      </td>
                      <td>
                        {s.status==="upcoming"
                          ? <button onClick={()=>setFeedbackSession(s)} className="chip chip-orange text-xs cursor-pointer hover:bg-ck-orange hover:text-white transition">Mark Done</button>
                          : s.status==="completed"
                          ? <span className="chip chip-green text-xs">✓ Done</span>
                          : <span className="text-ck-muted text-xs">Cancelled</span>}
                      </td>
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
