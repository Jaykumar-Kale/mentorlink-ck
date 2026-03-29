
import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";
import toast from "react-hot-toast";

export default function MenteeProfile() {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving,  setSaving]  = useState(false);
  const [form, setForm] = useState({
    name: user?.name||"", phone: user?.phone||"",
    college: user?.college||"", year: user?.year||"",
    stream: user?.stream||"", city: user?.city||"",
  });

  const save = async e => {
    e.preventDefault(); setSaving(true);
    try { const r = await api.put("/auth/update-profile", form); updateUser(r.data.user); toast.success("Profile updated!"); setEditing(false); }
    catch { toast.error("Update failed"); }
    setSaving(false);
  };

  const avatar = user?.profilePhoto ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name||"S")}&background=0066CC&color=fff&size=96&bold=true`;

  const Field = ({ label, value }) => (
    <div className="py-3 border-b border-ck-gray last:border-0">
      <p className="text-xs font-black uppercase tracking-wider text-ck-muted mb-0.5">{label}</p>
      <p className="text-ck-text font-semibold text-sm">{value || <span className="text-ck-muted italic font-normal">Not provided</span>}</p>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="page-hero">
        <h1 className="text-4xl font-black text-white" style={{fontFamily:"Sora,sans-serif"}}>My Profile</h1>
        <p className="text-blue-300 text-sm mt-2">Scholar › Profile</p>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        {/* Avatar */}
        <div className="card-flat flex items-center gap-5">
          <img src={avatar} alt="avatar" className="w-20 h-20 rounded-2xl object-cover border-2 border-ck-blue-l shadow-card"/>
          <div>
            <h2 className="text-xl font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>{user?.name}</h2>
            <p className="text-ck-orange font-bold text-sm capitalize">Scholar / Mentee</p>
            <p className="text-ck-muted text-sm">{user?.email}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              <span className={`chip text-xs ${user?.needAnalysisCompleted?"chip-green":"chip-orange"}`}>
                {user?.needAnalysisCompleted ? "✓ Need Analysis Done" : "⚠ Need Analysis Pending"}
              </span>
              <span className={`chip text-xs ${user?.isMatched?"chip-green":"chip-gray"}`}>
                {user?.isMatched ? "✓ Mentor Assigned" : "Awaiting Mentor"}
              </span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="card-flat">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>Profile Details</h3>
            {!editing && <button onClick={()=>setEditing(true)} className="btn-secondary text-xs py-2 px-4">Edit Profile</button>}
          </div>
          {!editing ? (
            <div>
              <Field label="Full Name" value={user?.name}/>
              <Field label="Email" value={user?.email}/>
              <Field label="Phone" value={user?.phone}/>
              <Field label="College" value={user?.college}/>
              <Field label="Year of Study" value={user?.year}/>
              <Field label="Stream / Branch" value={user?.stream}/>
              <Field label="Scholar ID" value={user?.scholarshipId}/>
              <Field label="City" value={user?.city}/>
            </div>
          ) : (
            <form onSubmit={save} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {l:"Full Name",k:"name",ph:"Your name"},
                {l:"Phone",k:"phone",ph:"+91 98765 43210"},
                {l:"College",k:"college",ph:"College name"},
                {l:"Year",k:"year",ph:"First Year / Final Year"},
                {l:"Stream",k:"stream",ph:"Computer Engineering"},
                {l:"City",k:"city",ph:"Your city"},
              ].map(f=>(
                <div key={f.k}>
                  <label className="form-label">{f.l}</label>
                  <input className="form-input" value={form[f.k]} placeholder={f.ph}
                    onChange={e=>setForm({...form,[f.k]:e.target.value})}/>
                </div>
              ))}
              <div className="sm:col-span-2 flex gap-3 pt-2">
                <button type="button" onClick={()=>setEditing(false)} className="flex-1 py-2.5 border border-ck-gray-b rounded-xl text-ck-muted font-bold text-sm">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 btn-secondary justify-center py-2.5 text-sm disabled:opacity-60">
                  {saving?"Saving...":"Save Changes →"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Assigned Mentor */}
        {user?.assignedMentor && (
          <div className="card-flat" style={{background:"linear-gradient(135deg,#F0F7FF,#E8F2FF)"}}>
            <p className="text-xs font-black uppercase tracking-wider text-ck-blue mb-3">Your Cybage Mentor</p>
            <div className="flex items-center gap-4">
              <img src={user.assignedMentor.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.assignedMentor.name)}&background=0066CC&color=fff&size=48&bold=true`}
                alt="mentor" className="w-12 h-12 rounded-xl object-cover"/>
              <div>
                <p className="font-black text-ck-dark">{user.assignedMentor.name}</p>
                <p className="text-ck-blue text-sm font-semibold">{user.assignedMentor.designation}</p>
                <a href={`mailto:${user.assignedMentor.email}`} className="text-ck-orange text-xs hover:underline">{user.assignedMentor.email}</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
