
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../utils/api";
import toast from "react-hot-toast";

export default function AdminMatching() {
  const [unmatched,   setUnmatched]   = useState([]);
  const [mentors,     setMentors]     = useState([]);
  const [running,     setRunning]     = useState(false);
  const [results,     setResults]     = useState([]);
  const [selected,    setSelected]    = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSugg, setLoadingSugg] = useState(false);
  const [manualMentor,setManualMentor]= useState("");
  const [assigning,   setAssigning]   = useState(false);
  const [loading,     setLoading]     = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [unRes, menRes] = await Promise.all([
        api.get("/admin/users?role=mentee&isMatched=false"),
        api.get("/admin/users?role=mentor"),
      ]);
      setUnmatched(unRes.data.users); setMentors(menRes.data.users);
    } catch { toast.error("Failed to load"); }
    setLoading(false);
  };
  useEffect(() => { fetchData(); }, []);

  const autoMatch = async () => {
    setRunning(true);
    try { const r = await api.post("/admin/auto-match"); toast.success(r.data.message); setResults(r.data.results); fetchData(); }
    catch(err) { toast.error(err.response?.data?.message||"Failed"); }
    setRunning(false);
  };

  const selectScholar = async s => {
    setSelected(s); setManualMentor(""); setSuggestions([]); setLoadingSugg(true);
    try { const r = await api.get(`/admin/match-suggestions/${s._id}`); setSuggestions(r.data.suggestions); }
    catch { setSuggestions([]); }
    setLoadingSugg(false);
  };

  const manualMatch = async () => {
    if (!selected||!manualMentor) { toast.error("Select both scholar and mentor"); return; }
    setAssigning(true);
    try { const r = await api.post("/admin/manual-match",{menteeId:selected._id,mentorId:manualMentor}); toast.success(r.data.message); fetchData(); setSelected(null); setSuggestions([]); }
    catch(err) { toast.error(err.response?.data?.message||"Failed"); }
    setAssigning(false);
  };

  return (
    <DashboardLayout>
      <div className="page-hero">
        <h1 className="text-4xl font-black text-white" style={{fontFamily:"Sora,sans-serif"}}>Mentor–Scholar Matching</h1>
        <p className="text-blue-300 text-sm mt-2">Admin › Matching Algorithm</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            {l:"Unmatched Scholars",v:unmatched.length,bg:"bg-red-500"},
            {l:"Available Mentors", v:mentors.length,  bg:"bg-ck-blue"},
            {l:"Matched This Run",  v:results.length,  bg:"bg-green-600"},
          ].map(c=>(
            <div key={c.l} className={`${c.bg} text-white rounded-2xl p-5 text-center`}>
              <p className="text-3xl font-black" style={{fontFamily:"Sora,sans-serif"}}>{c.v}</p>
              <p className="text-xs opacity-75 mt-1 font-semibold">{c.l}</p>
            </div>
          ))}
        </div>

        {/* Auto match */}
        <div className="card-flat">
          <h2 className="font-black text-ck-dark mb-2" style={{fontFamily:"Sora,sans-serif"}}>Automated Matching Algorithm</h2>
          <p className="text-ck-muted text-sm mb-4">
            Scores each scholar-mentor pair on Language compatibility (25pts) + Domain expertise match (40pts) + Mentor workload (25pts) + Cybage experience (10pts) = 100 max.
          </p>
          <button onClick={autoMatch} disabled={running||unmatched.length===0}
            className="btn-primary disabled:opacity-60">
            {running ? "⚙️ Running algorithm…" : `🔗 Run Auto-Match (${unmatched.length} unmatched)`}
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
            <h3 className="font-black text-green-800 mb-3" style={{fontFamily:"Sora,sans-serif"}}>✅ Matching Results</h3>
            <div className="space-y-2">
              {results.map((r,i)=>(
                <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-green-100">
                  <span className="w-7 h-7 bg-green-500 text-white rounded-lg flex items-center justify-center text-xs font-black">{i+1}</span>
                  <p className="font-bold text-ck-dark text-sm flex-1">{r.mentee.name}</p>
                  <span className="text-ck-muted text-xs">→</span>
                  <p className="font-bold text-ck-blue text-sm flex-1">{r.mentor.name}</p>
                  <span className="chip chip-blue text-xs">Score: {r.score}/100</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Manual matching */}
        <div className="card-flat">
          <h2 className="font-black text-ck-dark mb-4" style={{fontFamily:"Sora,sans-serif"}}>Manual Matching</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="form-label">Select Unmatched Scholar</p>
              {loading ? <p className="text-ck-muted text-sm">Loading…</p>
              : unmatched.length===0 ? <p className="text-green-600 font-bold text-sm">✅ All scholars are matched!</p>
              : (
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {unmatched.map(s=>(
                    <div key={s._id} onClick={()=>selectScholar(s)}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition ${selected?._id===s._id?"border-ck-blue bg-ck-blue-xl":"border-ck-gray-b hover:border-ck-blue-l"}`}>
                      <p className="font-bold text-ck-dark text-sm">{s.name}</p>
                      <p className="text-ck-muted text-xs">{s.college} · {s.year}</p>
                      {!s.needAnalysisCompleted && <span className="chip chip-orange text-xs mt-1">⚠ Need analysis pending</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              {selected ? (
                <>
                  <p className="form-label">Top Mentors for <span className="text-ck-blue">{selected.name}</span></p>
                  {loadingSugg ? <p className="text-ck-muted text-sm">Calculating scores…</p>
                  : suggestions.length===0 ? <p className="text-ck-muted text-sm">Submit need analysis first for smart suggestions.</p>
                  : (
                    <div className="space-y-2 max-h-48 overflow-y-auto mb-3">
                      {suggestions.map((s,i)=>(
                        <div key={i} onClick={()=>setManualMentor(s.mentor._id)}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition ${manualMentor===s.mentor._id?"border-ck-orange bg-ck-orange-l":"border-ck-gray-b hover:border-ck-blue-l"}`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-bold text-ck-dark text-sm">{s.mentor.name}</p>
                              <p className="text-ck-muted text-xs">{s.mentor.department}</p>
                              <p className="text-ck-muted text-xs">Load: {s.mentor.currentMentees}/3</p>
                            </div>
                            <span className="chip chip-blue font-black">{s.score}/100</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label">Or pick from all mentors</label>
                    <select className="form-input" value={manualMentor} onChange={e=>setManualMentor(e.target.value)}>
                      <option value="">Select mentor</option>
                      {mentors.map(m=><option key={m._id} value={m._id}>{m.name} — {m.department||"Cybage"}</option>)}
                    </select>
                  </div>
                  <button onClick={manualMatch} disabled={assigning||!manualMentor} className="btn-primary w-full justify-center disabled:opacity-60">
                    {assigning ? "Assigning…" : `Assign Mentor to ${selected.name} →`}
                  </button>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-center py-10">
                  <div>
                    <div className="text-4xl mb-2">👈</div>
                    <p className="text-ck-muted text-sm">Select a scholar to see mentor suggestions</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
