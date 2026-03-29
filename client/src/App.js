
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";

import HomePage        from "./pages/public/HomePage";
import AboutPage       from "./pages/public/AboutPage";
import ScholarshipPage from "./pages/public/ScholarshipPage";
import TestimonialsPage from "./pages/public/TestimonialsPage";
import ContactPage     from "./pages/public/ContactPage";
import LoginPage       from "./pages/LoginPage";
import RegisterPage    from "./pages/RegisterPage";
import ForgotPassword  from "./pages/ForgotPassword";
import ResetPassword   from "./pages/ResetPassword";

import MenteeDashboard from "./pages/mentee/Dashboard";
import MenteeModules   from "./pages/mentee/Modules";
import MenteeSessions  from "./pages/mentee/Sessions";
import NeedAnalysis    from "./pages/mentee/NeedAnalysis";
import MenteeProfile   from "./pages/mentee/Profile";

import MentorDashboard from "./pages/mentor/Dashboard";
import MentorScholars  from "./pages/mentor/Scholars";
import MentorSessions  from "./pages/mentor/Sessions";
import MentorProfile   from "./pages/mentor/Profile";

import AdminDashboard  from "./pages/admin/Dashboard";
import AdminUsers      from "./pages/admin/Users";
import AdminMatching   from "./pages/admin/Matching";
import AdminSessions   from "./pages/admin/Sessions";
import AdminModules    from "./pages/admin/Modules";

const Guard = ({ children, roles }) => {
  const { user, token, loading } = useAuth();
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-ck-light">
      <div className="text-center">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl mx-auto mb-4"
          style={{background:"linear-gradient(135deg,#0055B3,#003D82)",fontFamily:"Sora,sans-serif"}}>CK</div>
        <div className="w-8 h-8 border-4 border-ck-blue-l border-t-ck-blue rounded-full animate-spin mx-auto mb-3"/>
        <p className="text-ck-muted text-sm font-semibold">Loading MentorLink...</p>
      </div>
    </div>
  );
  if (!token || !user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{
          duration: 3500,
          style: { fontFamily:"Inter,sans-serif", fontSize:"14px", borderRadius:"12px", fontWeight:"500" },
          success: { style:{ background:"#F0FDF4", border:"1px solid #BBF7D0", color:"#166534" }, iconTheme:{ primary:"#0055B3", secondary:"#fff" } },
          error:   { style:{ background:"#FFF1F2", border:"1px solid #FECDD3", color:"#9F1239" } },
        }} />
        <Routes>
          {/* Public */}
          <Route path="/"                      element={<HomePage />} />
          <Route path="/about"                 element={<AboutPage />} />
          <Route path="/scholarship"           element={<ScholarshipPage />} />
          <Route path="/testimonials"          element={<TestimonialsPage />} />
          <Route path="/contact"               element={<ContactPage />} />
          <Route path="/login"                 element={<LoginPage />} />
          <Route path="/register"              element={<RegisterPage />} />
          <Route path="/forgot-password"       element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Mentee */}
          <Route path="/mentee/dashboard"     element={<Guard roles={["mentee"]}><MenteeDashboard /></Guard>} />
          <Route path="/mentee/modules"       element={<Guard roles={["mentee"]}><MenteeModules /></Guard>} />
          <Route path="/mentee/sessions"      element={<Guard roles={["mentee"]}><MenteeSessions /></Guard>} />
          <Route path="/mentee/need-analysis" element={<Guard roles={["mentee"]}><NeedAnalysis /></Guard>} />
          <Route path="/mentee/profile"       element={<Guard roles={["mentee"]}><MenteeProfile /></Guard>} />

          {/* Mentor */}
          <Route path="/mentor/dashboard" element={<Guard roles={["mentor"]}><MentorDashboard /></Guard>} />
          <Route path="/mentor/scholars"  element={<Guard roles={["mentor"]}><MentorScholars /></Guard>} />
          <Route path="/mentor/sessions"  element={<Guard roles={["mentor"]}><MentorSessions /></Guard>} />
          <Route path="/mentor/profile"   element={<Guard roles={["mentor"]}><MentorProfile /></Guard>} />

          {/* Admin */}
          <Route path="/admin/dashboard" element={<Guard roles={["admin"]}><AdminDashboard /></Guard>} />
          <Route path="/admin/users"     element={<Guard roles={["admin"]}><AdminUsers /></Guard>} />
          <Route path="/admin/matching"  element={<Guard roles={["admin"]}><AdminMatching /></Guard>} />
          <Route path="/admin/sessions"  element={<Guard roles={["admin"]}><AdminSessions /></Guard>} />
          <Route path="/admin/modules"   element={<Guard roles={["admin"]}><AdminModules /></Guard>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
