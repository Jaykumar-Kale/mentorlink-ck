
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

export function ForgotPassword() {
  const [email, setEmail] = useState(""); const [sent, setSent] = useState(false); const [loading, setLoading] = useState(false);
  const submit = async e => { e.preventDefault(); setLoading(true); try { await api.post("/auth/forgot-password",{email}); setSent(true); toast.success("Reset link sent!"); } catch(err){ toast.error(err.response?.data?.message||"Error"); } setLoading(false); };
  return (
    <div className="min-h-screen bg-ck-light">
      <Navbar/>
      <div className="flex items-center justify-center min-h-screen px-4" style={{paddingTop:"80px"}}>
        <div className="bg-white rounded-3xl shadow-card-lg border border-ck-gray-b p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-ck-blue-xl rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">🔒</div>
            <h2 className="text-2xl font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>Forgot Password?</h2>
            <p className="text-ck-muted text-sm mt-1">Enter your email to receive a reset link</p>
          </div>
          {sent ? (
            <div className="text-center">
              <div className="text-5xl mb-3">📧</div>
              <p className="font-bold text-green-600 mb-2">Reset email sent!</p>
              <p className="text-sm text-ck-muted mb-4">Check your inbox. Link expires in 10 minutes.</p>
              <Link to="/login" className="btn-secondary text-sm">Back to Sign In</Link>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div><label className="form-label">Email Address</label><input type="email" required className="form-input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com"/></div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 disabled:opacity-60">{loading?"Sending...":"Send Reset Link"}</button>
              <p className="text-center text-sm"><Link to="/login" className="text-ck-muted hover:text-ck-blue">← Back to Sign In</Link></p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export function ResetPassword() {
  const { token } = useParams(); const navigate = useNavigate();
  const [password, setPassword] = useState(""); const [confirm, setConfirm] = useState(""); const [loading, setLoading] = useState(false);
  const submit = async e => {
    e.preventDefault(); if (password!==confirm){ toast.error("Passwords do not match"); return; }
    setLoading(true); try { await api.put(`/auth/reset-password/${token}`,{password}); toast.success("Password reset!"); navigate("/login"); } catch(err){ toast.error(err.response?.data?.message||"Failed"); } setLoading(false);
  };
  return (
    <div className="min-h-screen bg-ck-light">
      <Navbar/>
      <div className="flex items-center justify-center min-h-screen px-4" style={{paddingTop:"80px"}}>
        <div className="bg-white rounded-3xl shadow-card-lg border border-ck-gray-b p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-ck-orange-l rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">🔑</div>
            <h2 className="text-2xl font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>Set New Password</h2>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <div><label className="form-label">New Password</label><input type="password" required className="form-input" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Min 6 characters"/></div>
            <div><label className="form-label">Confirm Password</label><input type="password" required className="form-input" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Repeat password"/></div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 disabled:opacity-60">{loading?"Resetting...":"Reset Password"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
