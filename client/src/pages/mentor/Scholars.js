
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../utils/api";
import toast from "react-hot-toast";

const RATING_LABELS = {
  careerClarity:"Career Clarity", communicationSkills:"Communication",
  technicalSkills:"Technical", interviewReadiness:"Interview Prep",
  softSkills:"Soft Skills", resumeStrength:"Resume",
};
const EMOJI = ["","😟","😕","😐","😊","🤩"];

export default function MentorScholars() {
  const [scholars,  setScholars]  = useState([]);
  const [selected,  setSelected]  = useState(null);
  const [analysis,  setAnalysis]  = useState(null);
  const [loadingNA, setLoadingNA] = useState(false);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    api.get("/auth/me")
      .then(r => setScholars(r.data.user.assignedMentees || []))
      .catch(() => toast.error("Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  const viewScholar = async s => {
    setSelected(s); setAnalysis(null); setLoadingNA(true);
    try { const r = await api.get(`/need-analysis/${s._id}`); setAnalysis(r.data.form); }
    catch { setAnalysis(null); }
    setLoadingNA(false);
  };

  return (
    <DashboardLayout>
      <div className="page-hero">
        <h1 className="text-4xl font-black text-white" style={{fontFamily:"Sora,sans-serif"}}>My Scholars</h1>
        <p className="text-blue-300 text-sm mt-2">Mentor › Assigned Scholars ({scholars.length})</p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {loading ? <div className="flex justify-center py-20 text-ck-muted">Loading…</div>
        : scholars.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl mb-3">👥</div>
            <p className="font-black text-ck-dark text-lg">No scholars assigned yet</p>
            <p className="text-ck-muted text-sm mt-1">CybageKhushboo admin will assign scholars based on the matching algorithm.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* List */}
            <div className="lg:col-span-2 space-y-3">
              {scholars.map(s=>(
                <div key={s._id} onClick={()=>viewScholar(s)}
                  className={`card p-4 cursor-pointer transition-all ${selected?._id===s._id?"border-ck-blue shadow-blue":""}`}>
                  <div className="flex items-center gap-3">
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=0066CC&color=fff&size=48&bold=true`}
                      alt={s.name} className="w-12 h-12 rounded-xl flex-shrink-0"/>
                    <div className="min-w-0">
                      <p className="font-black text-ck-dark text-sm truncate">{s.name}</p>
                      <p className="text-ck-muted text-xs truncate">{s.college}</p>
                      <p className="text-ck-muted text-xs">{s.year} · {s.stream}</p>
                    </div>
                  </div>
                  <a href={`mailto:${s.email}`} className="block text-xs text-ck-blue hover:underline mt-2 truncate">{s.email}</a>
                </div>
              ))}
            </div>
            {/* Detail */}
            <div className="lg:col-span-3">
              {!selected ? (
                <div className="card-flat flex flex-col items-center justify-center text-center h-full py-20">
                  <div className="text-5xl mb-3">👈</div>
                  <p className="font-bold text-ck-dark">Select a scholar</p>
                  <p className="text-ck-muted text-xs mt-1">View their profile and need analysis</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-ck-gray-b shadow-card overflow-hidden">
                  <div className="p-5 text-white flex items-center gap-4" style={{background:"linear-gradient(135deg,#0055B3,#003D82)"}}>
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selected.name)}&background=fff&color=0066CC&size=56&bold=true`}
                      alt={selected.name} className="w-14 h-14 rounded-2xl border-2 border-white/30"/>
                    <div>
                      <h2 className="font-black text-base" style={{fontFamily:"Sora,sans-serif"}}>{selected.name}</h2>
                      <p className="text-blue-200 text-xs">{selected.college} · {selected.year}</p>
                      <a href={`mailto:${selected.email}`} className="text-amber-300 text-xs hover:underline">{selected.email}</a>
                    </div>
                  </div>
                  <div className="p-5">
                    {loadingNA ? <div className="text-center py-8 text-ck-muted">Loading need analysis…</div>
                    : !analysis ? (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-2">📋</div>
                        <p className="text-ck-muted text-sm">Need analysis not submitted yet by this scholar.</p>
                      </div>
                    ) : (
                      <div className="space-y-5">
                        {analysis.careerGoal && (
                          <div>
                            <p className="form-label">Career Goal</p>
                            <p className="bg-ck-blue-xl rounded-xl p-3 text-sm text-ck-text">{analysis.careerGoal}</p>
                          </div>
                        )}
                        <div>
                          <p className="form-label mb-3">Self-Ratings (focus on weak areas)</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {Object.entries(analysis.ratings||{}).map(([k,v])=>(
                              <div key={k} className={`p-3 rounded-xl text-center border ${v<=2?"border-red-200 bg-red-50":v<=3?"border-amber-200 bg-amber-50":"border-green-200 bg-green-50"}`}>
                                <div className="text-xl">{EMOJI[v]}</div>
                                <p className="text-xs font-bold text-ck-dark mt-1">{RATING_LABELS[k]||k}</p>
                                <p className={`text-xs font-black mt-0.5 ${v<=2?"text-red-600":v<=3?"text-amber-600":"text-green-600"}`}>{v}/5</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        {analysis.specificHelp && (
                          <div>
                            <p className="form-label">Specific Help Needed</p>
                            <p className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-ck-text">{analysis.specificHelp}</p>
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div><p className="form-label">Preferred Mode</p><p className="font-semibold text-ck-dark">{analysis.preferredMode||"—"}</p></div>
                          <div><p className="form-label">Languages</p><p className="font-semibold text-ck-dark">{analysis.preferredLanguage?.join(", ")||"—"}</p></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
