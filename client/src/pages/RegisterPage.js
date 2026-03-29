import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("mentee");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "", gender: "",
    employeeId: "", department: "", designation: "", yearsAtCybage: "", languagesKnown: "", expertise: "", linkedIn: "",
    college: "", year: "", stream: "", scholarshipId: "", city: "",
  });

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault(); setLoading(true);
    try {
      await api.post("/auth/register", { ...form, role });
      toast.success("Account created! Please sign in.");
      navigate("/login");
    } catch(err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  const F = ({ label, name, type = "text", placeholder = "", opts = null, required = false }) => (
    <div>
      <label className="form-label">{label}{required && <span className="text-red-400 ml-1">*</span>}</label>
      {opts ? (
        <select name={name} value={form[name]} onChange={handle} className="form-input" required={required}>
          <option value="">Select</option>
          {opts.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} name={name} value={form[name]} onChange={handle} className="form-input" placeholder={placeholder} required={required} />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-ck-light">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-10" style={{ paddingTop: "100px" }}>
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-3xl shadow-card-lg border border-ck-gray-b p-8">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden"
                style={{background:"linear-gradient(135deg,#0055B3,#003D82)"}}>
                <img src="https://www.cybagekhushboo.org/media/1133/khushboo-logo.png" alt="CK"
                  className="w-full h-full object-cover"
                  onError={e => { e.target.style.display="none"; }}
                />
              </div>
              <h1 className="text-2xl font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>Create Account</h1>
              <p className="text-ck-muted text-sm mt-1">Join the CybageKhushboo MentorLink Programme</p>
            </div>

            {/* Role toggle */}
            <div className="flex gap-3 mb-8 p-1 bg-ck-gray rounded-xl">
              {[{ k: "mentee", l: "Scholar / Student" }, { k: "mentor", l: "Cybage Mentor" }].map(r => (
                <button key={r.k} type="button" onClick={() => setRole(r.k)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition ${role === r.k ? "bg-ck-blue text-white shadow-sm" : "text-ck-muted hover:text-ck-dark"}`}>
                  {r.l}
                </button>
              ))}
            </div>

            <form onSubmit={submit} className="space-y-4">
              {/* Common */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <F label="Full Name" name="name" placeholder="Your full name" required />
                <F label="Email" name="email" type="email" placeholder="you@email.com" required />
                <F label="Password" name="password" type="password" placeholder="Min 6 characters" required />
                <F label="Phone" name="phone" placeholder="+91 98765 43210" />
                <F label="Gender" name="gender" opts={["Male", "Female", "Other"]} />
                <F label="City" name="city" placeholder="Your city" />
              </div>

              {role === "mentor" && (
                <div className="border-t border-ck-gray pt-5 space-y-4">
                  <p className="text-xs font-black uppercase tracking-widest text-ck-orange">Cybage Employee Details</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <F label="Cybage Employee ID" name="employeeId" placeholder="EMP-XXXXX" />
                    <F label="Department" name="department" placeholder="e.g. Product Engineering" />
                    <F label="Designation" name="designation" placeholder="e.g. Senior Software Engineer" />
                    <F label="Years at Cybage" name="yearsAtCybage" type="number" placeholder="e.g. 5" />
                    <F label="Languages Known" name="languagesKnown" placeholder="English, Marathi, Hindi" />
                    <div>
                      <label className="form-label">Expertise Areas</label>
                      <input name="expertise" value={form.expertise} onChange={handle} className="form-input"
                        placeholder="Java, Career Dev, Communication..." />
                    </div>
                    <div className="sm:col-span-2">
                      <F label="LinkedIn Profile" name="linkedIn" placeholder="https://linkedin.com/in/yourname" />
                    </div>
                  </div>
                </div>
              )}

              {role === "mentee" && (
                <div className="border-t border-ck-gray pt-5 space-y-4">
                  <p className="text-xs font-black uppercase tracking-widest text-ck-orange">Student Information</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <F label="College / University" name="college" placeholder="Your college name" required />
                    <F label="Year of Study" name="year" opts={["First Year", "Second Year", "Third Year", "Final Year", "Post Graduate"]} />
                    <F label="Stream / Branch" name="stream" placeholder="e.g. Computer Engineering" />
                    <F label="CybageKhushboo Scholar ID" name="scholarshipId" placeholder="CK-2024-XXXX" />
                  </div>
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base mt-2 disabled:opacity-60">
                {loading ? "Creating Account..." : "Create Account →"}
              </button>
            </form>

            <p className="text-center text-sm text-ck-muted mt-5">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-ck-blue hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
