
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../utils/api";
import toast from "react-hot-toast";

export default function AdminUsers() {
  const [users,   setUsers]   = useState([]);
  const [total,   setTotal]   = useState(0);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState("");
  const [role,    setRole]    = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [saving,  setSaving]  = useState(false);
  const [nu, setNu] = useState({name:"",email:"",password:"",role:"mentee",phone:"",gender:"",department:"",college:"",year:""});

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search",search);
      if (role)   params.append("role",role);
      const r = await api.get(`/admin/users?${params}`);
      setUsers(r.data.users); setTotal(r.data.total);
    } catch { toast.error("Failed to load users"); }
    setLoading(false);
  };
  useEffect(() => { fetchUsers(); }, [search, role]); // eslint-disable-line

  const createUser = async e => {
    e.preventDefault(); setSaving(true);
    try { await api.post("/admin/users",nu); toast.success("User created!"); setShowAdd(false); fetchUsers(); }
    catch(err) { toast.error(err.response?.data?.message||"Failed"); }
    setSaving(false);
  };

  const deleteUser = async (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return;
    try { await api.delete(`/admin/users/${id}`); toast.success("Deleted"); fetchUsers(); }
    catch { toast.error("Failed"); }
  };

  const toggleActive = async (id, cur) => {
    try { await api.put(`/admin/users/${id}`,{isActive:!cur}); fetchUsers(); }
    catch { toast.error("Failed"); }
  };

  return (
    <DashboardLayout>
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-ck-gray-b">
              <h2 className="font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>Add New User</h2>
              <button onClick={()=>setShowAdd(false)} className="w-8 h-8 rounded-xl bg-ck-gray flex items-center justify-center text-ck-muted">✕</button>
            </div>
            <form onSubmit={createUser} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[{l:"Name *",k:"name",r:true},{l:"Email *",k:"email",t:"email",r:true},{l:"Password *",k:"password",t:"password",r:true}].map(f=>(
                  <div key={f.k} className={f.k==="name"?"col-span-2":""}>
                    <label className="form-label">{f.l}</label>
                    <input type={f.t||"text"} required={f.r} className="form-input" value={nu[f.k]}
                      onChange={e=>setNu({...nu,[f.k]:e.target.value})}/>
                  </div>
                ))}
                <div><label className="form-label">Role *</label>
                  <select required className="form-input" value={nu.role} onChange={e=>setNu({...nu,role:e.target.value})}>
                    {["mentee","mentor","admin","alumni","volunteer"].map(r=><option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div><label className="form-label">Phone</label>
                  <input className="form-input" value={nu.phone} onChange={e=>setNu({...nu,phone:e.target.value})}/>
                </div>
                {nu.role==="mentor" && (
                  <div className="col-span-2"><label className="form-label">Department</label>
                    <input className="form-input" value={nu.department} onChange={e=>setNu({...nu,department:e.target.value})} placeholder="e.g. Product Engineering"/>
                  </div>
                )}
                {nu.role==="mentee" && (
                  <>
                    <div><label className="form-label">College</label><input className="form-input" value={nu.college} onChange={e=>setNu({...nu,college:e.target.value})}/></div>
                    <div><label className="form-label">Year</label><input className="form-input" value={nu.year} onChange={e=>setNu({...nu,year:e.target.value})}/></div>
                  </>
                )}
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={()=>setShowAdd(false)} className="flex-1 py-3 border border-ck-gray-b rounded-xl text-ck-muted font-bold text-sm">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 btn-secondary justify-center py-3 text-sm disabled:opacity-60">
                  {saving?"Creating...":"Create User →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="page-hero">
        <h1 className="text-4xl font-black text-white" style={{fontFamily:"Sora,sans-serif"}}>Manage Users</h1>
        <p className="text-blue-300 text-sm mt-2">Admin › All Users ({total})</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="flex gap-3 flex-1">
            <input placeholder="🔍 Search name or email…" value={search} onChange={e=>setSearch(e.target.value)}
              className="form-input flex-1 max-w-xs"/>
            <select value={role} onChange={e=>setRole(e.target.value)} className="form-input w-36">
              <option value="">All Roles</option>
              {["mentor","mentee","admin","alumni","volunteer"].map(r=><option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <button onClick={()=>setShowAdd(true)} className="btn-primary text-sm">+ Add User</button>
        </div>

        {loading ? <div className="card-flat flex justify-center py-10 text-ck-muted">Loading…</div> : (
          <div className="bg-white rounded-2xl border border-ck-gray-b shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full data-table">
                <thead><tr>{["Name","Email","Role","Status","Matched","Joined","Actions"].map(h=><th key={h}>{h}</th>)}</tr></thead>
                <tbody>
                  {users.length===0 ? <tr><td colSpan={7} className="text-center py-10 text-ck-muted">No users found</td></tr>
                  : users.map(u=>(
                    <tr key={u._id}>
                      <td className="font-bold text-ck-dark">{u.name}</td>
                      <td className="text-ck-muted text-xs">{u.email}</td>
                      <td>
                        <span className={`chip text-xs ${u.role==="mentor"?"chip-blue":u.role==="admin"?"chip-gray":"chip-orange"}`}>{u.role}</span>
                      </td>
                      <td>
                        <button onClick={()=>toggleActive(u._id,u.isActive)}
                          className={`chip text-xs cursor-pointer transition ${u.isActive?"chip-green":"chip-gray"}`}>
                          {u.isActive?"Active":"Inactive"}
                        </button>
                      </td>
                      <td>
                        {u.role==="mentee"&&<span className={`chip text-xs ${u.isMatched?"chip-green":"chip-gray"}`}>
                          {u.isMatched?"✓ Matched":"Unmatched"}
                        </span>}
                      </td>
                      <td className="text-ck-muted text-xs">{new Date(u.createdAt).toLocaleDateString("en-IN")}</td>
                      <td>
                        <button onClick={()=>deleteUser(u._id,u.name)}
                          className="chip text-xs cursor-pointer hover:bg-red-500 hover:text-white transition" style={{background:"#FFF0F0",color:"#DC2626"}}>
                          Delete
                        </button>
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
