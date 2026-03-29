
import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";
import toast from "react-hot-toast";

export default function MentorProfile() {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving,  setSaving]  = useState(false);
  const [form, setForm] = useState({
    name: user?.name||"", phone: user?.phone||"",
    department: user?.department||"", designation: user?.designation||"",
    yearsAtCybage: user?.yearsAtCybage||"",
    languagesKnown: user?.languagesKnown?.join(", ")||"",
    expertise: user?.expertise?.join(", ")||"",
    linkedIn: user?.linkedIn||"", city: user?.city||"",
  });

  const save = async e => {
    e.preventDefault(); setSaving(true);
    try {
      const payload = { ...form,
        languagesKnown: form.languagesKnown.split(",").map(l=>l.trim()).filter(Boolean),
        expertise: form.expertise.split(",").map(e=>e.trim()).filter(Boolean),
        yearsAtCybage: Number(form.yearsAtCybage)||0,
      };
      const r = await api.put("/auth/update-profile", payload);
      updateUser(r.data.user); toast.success("Profile updated!"); setEditing(false);
    } catch { toast.error("Update failed"); }
    setSaving(false);
  };

  const avatar = user?.profilePhoto ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name||"M")}&background=0066CC&color=fff&size=96&bold=true`;

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
        <p className="text-blue-300 text-sm mt-2">Mentor › Profile</p>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        {/* Avatar */}
        <div className="card-flat flex items-center gap-5">
          <img src={avatar} alt="avatar" className="w-20 h-20 rounded-2xl object-cover border-2 border-ck-blue-l shadow-card"/>
          <div>
            <h2 className="text-xl font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>{user?.name}</h2>
            <p className="text-ck-orange font-bold text-sm">Cybage Volunteer Mentor</p>
            <p className="text-ck-muted text-sm">{user?.email}</p>
            <p className="text-ck-muted text-xs mt-0.5">{user?.designation} · {user?.department}</p>
          </div>
        </div>
        <div className="card-flat">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>Mentor Details</h3>
            {!editing && <button onClick={()=>setEditing(true)} className="btn-secondary text-xs py-2 px-4">Edit Profile</button>}
          </div>
          {!editing ? (
            <div>
              <Field label="Full Name" value={user?.name}/>
              <Field label="Email" value={user?.email}/>
              <Field label="Phone" value={user?.phone}/>
              <Field label="Employee ID" value={user?.employeeId}/>
              <Field label="Department" value={user?.department}/>
              <Field label="Designation" value={user?.designation}/>
              <Field label="Years at Cybage" value={user?.yearsAtCybage?`${user.yearsAtCybage} years`:null}/>
              <Field label="Languages Known" value={user?.languagesKnown?.join(", ")}/>
              <Field label="Expertise" value={user?.expertise?.join(", ")}/>
              <Field label="LinkedIn" value={user?.linkedIn}/>
            </div>
          ) : (
            <form onSubmit={save} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {l:"Full Name",k:"name"},{l:"Phone",k:"phone"},
                {l:"Department",k:"department"},{l:"Designation",k:"designation"},
                {l:"Years at Cybage",k:"yearsAtCybage",t:"number"},
                {l:"City",k:"city"},
                {l:"Languages (comma separated)",k:"languagesKnown"},
              ].map(f=>(
                <div key={f.k}>
                  <label className="form-label">{f.l}</label>
                  <input type={f.t||"text"} className="form-input" value={form[f.k]}
                    onChange={e=>setForm({...form,[f.k]:e.target.value})}/>
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="form-label">Expertise Areas (comma separated)</label>
                <input className="form-input" value={form.expertise}
                  onChange={e=>setForm({...form,expertise:e.target.value})}
                  placeholder="Java, Career Dev, Communication Skills..."/>
              </div>
              <div className="sm:col-span-2">
                <label className="form-label">LinkedIn URL</label>
                <input className="form-input" value={form.linkedIn}
                  onChange={e=>setForm({...form,linkedIn:e.target.value})} placeholder="https://linkedin.com/in/..."/>
              </div>
              <div className="sm:col-span-2 flex gap-3 pt-2">
                <button type="button" onClick={()=>setEditing(false)} className="flex-1 py-2.5 border border-ck-gray-b rounded-xl text-ck-muted font-bold text-sm">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 btn-secondary justify-center py-2.5 text-sm disabled:opacity-60">
                  {saving?"Saving...":"Save Changes →"}
                </button>
              </div>
            </form>
          )}
        </div>
        <div className="card-flat" style={{background:"linear-gradient(135deg,#FFF4EE,#FFE8D6)"}}>
          <p className="text-xs font-black uppercase tracking-wider text-ck-orange mb-2">Scholars Assigned</p>
          <p className="text-4xl font-black text-ck-orange" style={{fontFamily:"Sora,sans-serif"}}>{user?.assignedMentees?.length || 0}</p>
          <p className="text-ck-muted text-xs mt-1">scholars currently under your mentorship</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
