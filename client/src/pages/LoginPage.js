import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const ROLES = [
  { key: "mentee", label: "Scholar / Student", icon: "🎓", desc: "CybageKhushboo scholarship student", color: "border-ck-blue-l bg-ck-blue-xl hover:border-ck-blue" },
  { key: "mentor", label: "Cybage Mentor",     icon: "💼", desc: "Cybage Software employee mentor",  color: "border-orange-200 bg-orange-50 hover:border-ck-orange" },
  { key: "admin",  label: "Programme Admin",   icon: "⚙️", desc: "CybageKhushboo CSR team member",  color: "border-gray-200 bg-gray-50 hover:border-gray-400" },
  { key: "alumni", label: "CK Alumni",         icon: "🌟", desc: "Former CybageKhushboo scholar",   color: "border-purple-200 bg-purple-50 hover:border-purple-400" },
];

const QUOTES = {
  mentor: { q: "A mentor is someone who sees more talent and ability within you than you see in yourself.", a: "Bob Proctor" },
  mentee: { q: "Education is the most powerful weapon which you can use to change the world.", a: "Nelson Mandela" },
  admin:  { q: "The best way to find yourself is to lose yourself in the service of others.", a: "Mahatma Gandhi" },
  default:{ q: "Empowerment through education — the CybageKhushboo way.", a: "" },
};

export default function LoginPage() {
  const [step, setStep]       = useState("role");
  const [role, setRole]       = useState("");
  const [form, setForm]       = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [heroLogoError, setHeroLogoError] = useState(false);
  const [panelLogoError, setPanelLogoError] = useState(false);
  const { login }  = useAuth();
  const navigate   = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.user, res.data.token);
      toast.success(`Welcome back, ${res.data.user.name}! 👋`);
      const r = res.data.user.role;
      navigate(r === "admin" ? "/admin/dashboard" : r === "mentor" ? "/mentor/dashboard" : "/mentee/dashboard");
    } catch(err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
    setLoading(false);
  };

  const q = QUOTES[role] || QUOTES.default;

  return (
    <div className="min-h-screen bg-ck-light">
      <Navbar />
      <div className="flex items-center justify-center px-4" style={{ minHeight: "100vh", paddingTop: "100px", paddingBottom: "40px" }}>
        {step === "role" ? (
          <div className="w-full max-w-2xl animate-fade-up">
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden"
                style={{background:"linear-gradient(135deg,#0055B3,#003D82)"}}>
                {heroLogoError ? (
                  <span className="text-white font-black text-lg">CK</span>
                ) : (
                  <img src="https://www.cybagekhushboo.org/media/1133/khushboo-logo.png" alt="CK"
                    className="w-full h-full object-cover"
                    onError={() => setHeroLogoError(true)}
                  />
                )}
              </div>
              <h1 className="text-3xl font-black text-ck-dark mb-2" style={{fontFamily:"Sora,sans-serif"}}>Sign In to MentorLink</h1>
              <p className="text-ck-muted">Select your role to continue</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {ROLES.map(r => (
                <button key={r.key} onClick={() => { setRole(r.key); setStep("form"); }}
                  className={`border-2 rounded-2xl p-5 text-left transition-all hover:shadow-card hover:-translate-y-1 ${r.color}`}>
                  <div className="text-3xl mb-2">{r.icon}</div>
                  <p className="font-black text-sm mb-1 text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>{r.label}</p>
                  <p className="text-xs text-ck-muted">{r.desc}</p>
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-ck-muted">
              New user?{" "}
              <Link to="/register" className="font-bold text-ck-blue hover:underline">Create account</Link>
            </p>
          </div>
        ) : (
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-card-lg border border-ck-gray-b overflow-hidden flex animate-fade-up">
            {/* Left panel */}
            <div className="hidden sm:flex flex-col justify-between w-64 p-8 text-white flex-shrink-0"
              style={{background:"linear-gradient(160deg,#050E1F 0%,#0A1A3A 60%,#003D82 100%)"}}>
              <div>
                <div className="w-12 h-12 rounded-xl overflow-hidden mb-6" style={{background:"rgba(255,255,255,0.1)"}}>
                  {panelLogoError ? (
                    <div className="w-full h-full flex items-center justify-center text-white font-black text-sm">CK</div>
                  ) : (
                    <img src="https://www.cybagekhushboo.org/media/1133/khushboo-logo.png" alt="CK"
                      className="w-full h-full object-cover"
                      onError={() => setPanelLogoError(true)}
                    />
                  )}
                </div>
                <p className="text-xs text-blue-300 font-semibold uppercase tracking-widest mb-3">Inspiring words</p>
                <p className="text-sm text-blue-100 italic leading-relaxed mb-3">"{q.q}"</p>
                {q.a && <p className="text-xs text-blue-400 font-semibold">— {q.a}</p>}
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="text-xs text-blue-400 font-semibold">CybageKhushboo</p>
                <p className="text-xs text-blue-500">Charitable Trust · Est. 2009</p>
              </div>
            </div>

            {/* Form panel */}
            <div className="flex-1 p-8 lg:p-10">
              <button onClick={() => setStep("role")} className="flex items-center gap-1.5 text-xs text-ck-muted hover:text-ck-blue mb-6 transition font-semibold">
                ← Change role
              </button>
              <div className="mb-6">
                <h2 className="text-2xl font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>
                  {ROLES.find(r => r.key === role)?.label} Login
                </h2>
                <p className="text-ck-muted text-sm mt-1">Sign in to your MentorLink account</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="form-label">Email Address</label>
                  <input type="email" required className="form-input" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="form-label mb-0">Password</label>
                    <Link to="/forgot-password" className="text-xs text-ck-blue hover:underline font-semibold">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <input type={showPwd ? "text" : "password"} required className="form-input pr-12" value={form.password}
                      onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ck-muted hover:text-ck-blue font-semibold transition">
                      {showPwd ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-secondary w-full justify-center py-3.5 text-base disabled:opacity-60">
                  {loading ? "Signing in..." : "Sign In →"}
                </button>
              </form>
              <p className="text-center text-sm text-ck-muted mt-6">
                Don't have an account?{" "}
                <Link to="/register" className="font-bold text-ck-orange hover:underline">Register here</Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
