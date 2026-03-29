
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../utils/api";
import toast from "react-hot-toast";

const RATINGS = [
  { key:"careerClarity",       label:"Career Clarity", desc:"How clear are you about your career goals and path?" },
  { key:"communicationSkills", label:"Communication Skills", desc:"Your verbal and written communication effectiveness" },
  { key:"technicalSkills",     label:"Technical Skills", desc:"Your strength in your domain / subject area" },
  { key:"interviewReadiness",  label:"Interview Readiness", desc:"How prepared are you for job interviews?" },
  { key:"softSkills",          label:"Soft Skills", desc:"Professionalism, teamwork, time management" },
  { key:"resumeStrength",      label:"Resume Strength", desc:"How strong is your current resume / CV?" },
];
const EMOJIS = ["","😟","😕","😐","😊","🤩"];
const EMOJI_LABELS = ["","Needs work","Below avg","Average","Good","Excellent"];

export default function NeedAnalysis() {
  const [submitted, setSubmitted] = useState(false);
  const [existing,  setExisting]  = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [saving,    setSaving]    = useState(false);
  const [form, setForm] = useState({
    careerGoal:"", biggestChallenge:"",
    ratings:{ careerClarity:0, communicationSkills:0, technicalSkills:0, interviewReadiness:0, softSkills:0, resumeStrength:0 },
    preferredMode:"", preferredLanguage:[], willingToMeet:"", specificHelp:"",
  });

  useEffect(() => {
    api.get("/need-analysis/me")
      .then(r => { if (r.data.submitted) { setSubmitted(true); setExisting(r.data.form); } })
      .catch(() => {}).finally(() => setLoading(false));
  }, []);

  const setRating = (key, val) => setForm(f => ({ ...f, ratings: { ...f.ratings, [key]: val } }));
  const toggleLang = lang => {
    const arr = form.preferredLanguage;
    setForm(f => ({ ...f, preferredLanguage: arr.includes(lang) ? arr.filter(l=>l!==lang) : [...arr, lang] }));
  };

  const submit = async e => {
    e.preventDefault();
    const missing = RATINGS.find(r => !form.ratings[r.key]);
    if (missing) { toast.error(`Please rate "${missing.label}"`); return; }
    if (!form.careerGoal) { toast.error("Please describe your career goal"); return; }
    setSaving(true);
    try { await api.post("/need-analysis", form); toast.success("Need analysis submitted! 🎉"); setSubmitted(true); }
    catch(err) { toast.error(err.response?.data?.message || "Submission failed"); }
    setSaving(false);
  };

  if (loading) return <DashboardLayout><div className="flex items-center justify-center h-64 text-ck-muted">Loading…</div></DashboardLayout>;

  if (submitted && existing) return (
    <DashboardLayout>
      <div className="page-hero">
        <h1 className="text-4xl font-black text-white" style={{fontFamily:"Sora,sans-serif"}}>Need Analysis</h1>
        <p className="text-blue-300 text-sm mt-2">Scholar › Need Analysis</p>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-start gap-4 bg-green-50 border border-green-200 rounded-2xl p-5 mb-6">
          <span className="text-2xl">✅</span>
          <div>
            <p className="font-bold text-green-800">Form submitted successfully</p>
            <p className="text-green-700 text-xs mt-1">Submitted on {new Date(existing.submittedAt).toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"})}</p>
          </div>
        </div>
        <div className="card-flat space-y-5">
          <div><p className="form-label">Career Goal</p><p className="text-ck-text text-sm bg-ck-gray rounded-xl p-3">{existing.careerGoal}</p></div>
          <div><p className="form-label">Self-Ratings</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {RATINGS.map(r => {
                const val = existing.ratings?.[r.key] || 0;
                return (
                  <div key={r.key} className={`rounded-xl p-3 text-center border ${val<=2?"border-red-200 bg-red-50":val<=3?"border-amber-200 bg-amber-50":"border-green-200 bg-green-50"}`}>
                    <div className="text-2xl">{EMOJIS[val]}</div>
                    <p className="text-xs font-bold text-ck-dark mt-1">{r.label}</p>
                    <p className={`text-xs font-semibold mt-0.5 ${val<=2?"text-red-600":val<=3?"text-amber-600":"text-green-600"}`}>{EMOJI_LABELS[val]}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {existing.specificHelp && <div><p className="form-label">Specific Help Needed</p><p className="text-ck-text text-sm bg-ck-gray rounded-xl p-3">{existing.specificHelp}</p></div>}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="form-label">Preferred Mode</p><p className="text-ck-text">{existing.preferredMode||"—"}</p></div>
            <div><p className="form-label">Languages</p><p className="text-ck-text">{existing.preferredLanguage?.join(", ")||"—"}</p></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="page-hero">
        <h1 className="text-4xl font-black text-white" style={{fontFamily:"Sora,sans-serif"}}>Need Analysis Form</h1>
        <p className="text-blue-300 text-sm mt-2 max-w-lg mx-auto">
          Mandatory form — helps your Cybage mentor understand your needs and plan sessions accordingly
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Rating scale */}
        <div className="card-flat mb-6 flex flex-wrap justify-center gap-4">
          {[1,2,3,4,5].map(n=>(
            <div key={n} className="text-center">
              <div className="text-2xl">{EMOJIS[n]}</div>
              <p className="text-xs text-ck-muted mt-1 font-semibold">{EMOJI_LABELS[n]}</p>
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="space-y-5">
          {/* Career goal */}
          <div className="card-flat">
            <label className="form-label">1. What is your career goal? *</label>
            <p className="text-xs text-ck-muted mb-2">Describe your short and long term career aspirations (max 100 words)</p>
            <textarea required rows={4} className="form-input" style={{resize:"vertical"}} value={form.careerGoal}
              onChange={e=>setForm({...f,careerGoal:e.target.value})} placeholder="e.g. I want to become a software engineer at a product company..."
              onInput={function(){const w=this.value.trim().split(/\s+/).filter(Boolean).length;if(w>100)this.value=this.value.split(/\s+/).slice(0,100).join(" ");}}/>
          </div>

          {/* Ratings */}
          <div className="card-flat">
            <label className="form-label">2. Self-Rate your skills (1 = Needs Work, 5 = Excellent) *</label>
            <div className="space-y-5 mt-3">
              {RATINGS.map(r=>(
                <div key={r.key}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="text-sm font-bold text-ck-dark">{r.label}</p>
                      <p className="text-xs text-ck-muted">{r.desc}</p>
                    </div>
                    {form.ratings[r.key] > 0 && (
                      <span className="chip chip-blue text-xs">{EMOJI_LABELS[form.ratings[r.key]]}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(n=>(
                      <button key={n} type="button" onClick={()=>setRating(r.key,n)}
                        className={`flex-1 flex flex-col items-center py-2 rounded-xl border-2 transition ${
                          form.ratings[r.key]===n
                            ? n<=2 ? "border-red-400 bg-red-50" : n===3 ? "border-amber-400 bg-amber-50" : "border-green-400 bg-green-50"
                            : "border-ck-gray-b bg-ck-gray hover:border-ck-blue-l"
                        }`}>
                        <span className="text-xl">{EMOJIS[n]}</span>
                        <span className="text-xs font-bold text-ck-muted mt-0.5">{n}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Biggest challenge */}
          <div className="card-flat">
            <label className="form-label">3. What is your biggest challenge right now?</label>
            <textarea rows={3} className="form-input" style={{resize:"vertical"}} value={form.biggestChallenge}
              onChange={e=>setForm({...form,biggestChallenge:e.target.value})} placeholder="e.g. Getting placed in a good company, improving communication..."/>
          </div>

          {/* Mode + language */}
          <div className="card-flat grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">4. Preferred Session Mode</label>
              <select className="form-input" value={form.preferredMode} onChange={e=>setForm({...form,preferredMode:e.target.value})}>
                <option value="">Select</option>
                <option>Google Meet</option><option>Zoom</option><option>Microsoft Teams</option><option>Phone Call</option>
              </select>
            </div>
            <div>
              <label className="form-label">5. Willing to meet 2x/month?</label>
              <select className="form-input" value={form.willingToMeet} onChange={e=>setForm({...form,willingToMeet:e.target.value})}>
                <option value="">Select</option>
                <option>Yes, definitely</option><option>Yes</option><option>I will try</option><option>Not sure</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="form-label">6. Preferred Language</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {["English","Marathi","Hindi","Other"].map(lang=>(
                  <button key={lang} type="button" onClick={()=>toggleLang(lang)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition ${
                      form.preferredLanguage.includes(lang)
                        ? "bg-ck-blue text-white border-ck-blue"
                        : "bg-white text-ck-muted border-ck-gray-b hover:border-ck-blue-l"
                    }`}>{lang}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Specific help */}
          <div className="card-flat">
            <label className="form-label">7. Any specific area where you need mentor support?</label>
            <textarea rows={3} className="form-input" style={{resize:"vertical"}} value={form.specificHelp}
              onChange={e=>setForm({...form,specificHelp:e.target.value})} placeholder="e.g. Preparing for campus placements, building a portfolio..."/>
          </div>

          <button type="submit" disabled={saving} className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60">
            {saving ? "Submitting…" : "Submit Need Analysis →"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
