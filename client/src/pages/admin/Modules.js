
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../utils/api";
import toast from "react-hot-toast";

const DEFAULT = ["Career Development","Communication Skills","Interview Preparation","Technical Skills","Soft Skills","Resume Building","Higher Education Guidance","Personality Development"];
const FILE_ICONS = {pdf:"📄",ppt:"📊",pptx:"📊",doc:"📝",docx:"📝",video:"🎬",other:"📎"};

export default function AdminModules() {
  const [modules,   setModules]   = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [showAdd,   setShowAdd]   = useState(false);
  const [saving,    setSaving]    = useState(false);
  const [uploading, setUploading] = useState(null);
  const [nm, setNm] = useState({title:"",description:"",order:0});

  const fetch = () => api.get("/modules").then(r=>setModules(r.data.modules)).catch(()=>toast.error("Failed")).finally(()=>setLoading(false));
  useEffect(()=>{ fetch(); },[]);

  const create = async e => {
    e.preventDefault(); setSaving(true);
    try { await api.post("/modules",nm); toast.success("Module created!"); setShowAdd(false); setNm({title:"",description:"",order:0}); fetch(); }
    catch(err) { toast.error(err.response?.data?.message||"Failed"); }
    setSaving(false);
  };

  const upload = async (modId, e) => {
    const file = e.target.files[0]; if (!file) return;
    setUploading(modId);
    try {
      const fd = new FormData(); fd.append("file",file);
      await api.post(`/modules/${modId}/upload`, fd, {headers:{"Content-Type":"multipart/form-data"}});
      toast.success("File uploaded!"); fetch();
    } catch(err) { toast.error(err.response?.data?.message||"Upload failed"); }
    setUploading(null); e.target.value="";
  };

  const deleteRes = async (modId, rid) => {
    if (!window.confirm("Remove this file?")) return;
    try { await api.delete(`/modules/${modId}/resource/${rid}`); toast.success("Removed"); fetch(); }
    catch { toast.error("Failed"); }
  };

  const toggleMod = async (id, cur) => {
    try { await api.put(`/modules/${id}`,{isActive:!cur}); fetch(); }
    catch { toast.error("Failed"); }
  };

  return (
    <DashboardLayout>
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-ck-gray-b">
              <h2 className="font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>Create Module</h2>
              <button onClick={()=>setShowAdd(false)} className="w-8 h-8 rounded-xl bg-ck-gray flex items-center justify-center text-ck-muted">✕</button>
            </div>
            <form onSubmit={create} className="p-6 space-y-4">
              <div><label className="form-label">Title *</label>
                <input required className="form-input" value={nm.title} onChange={e=>setNm({...nm,title:e.target.value})} list="mod-defaults" placeholder="e.g. Career Development"/>
                <datalist id="mod-defaults">{DEFAULT.map(d=><option key={d} value={d}/>)}</datalist>
              </div>
              <div><label className="form-label">Description</label>
                <textarea rows={3} className="form-input" style={{resize:"vertical"}} value={nm.description} onChange={e=>setNm({...nm,description:e.target.value})} placeholder="Brief module description…"/>
              </div>
              <div><label className="form-label">Display Order</label>
                <input type="number" className="form-input" value={nm.order} onChange={e=>setNm({...nm,order:Number(e.target.value)})}/>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={()=>setShowAdd(false)} className="flex-1 py-3 border border-ck-gray-b rounded-xl text-ck-muted font-bold text-sm">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 btn-secondary justify-center py-3 text-sm disabled:opacity-60">
                  {saving?"Creating…":"Create Module →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="page-hero">
        <h1 className="text-4xl font-black text-white" style={{fontFamily:"Sora,sans-serif"}}>Learning Modules</h1>
        <p className="text-blue-300 text-sm mt-2">Admin › Manage Modules</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        <div className="flex justify-between items-center">
          <p className="text-ck-muted text-sm font-semibold">{modules.length} modules</p>
          <button onClick={()=>setShowAdd(true)} className="btn-secondary text-sm">+ Create Module</button>
        </div>

        {loading ? <div className="card-flat flex justify-center py-10 text-ck-muted">Loading…</div>
        : modules.length===0 ? (
          <div className="card-flat flex flex-col items-center justify-center py-16 text-center">
            <div className="text-5xl mb-3">📚</div>
            <p className="font-bold text-ck-dark">No modules yet</p>
            <p className="text-ck-muted text-sm mt-1">Create modules and upload PPT/PDF learning materials for scholars.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {modules.map(mod=>(
              <div key={mod._id} className="bg-white rounded-2xl border border-ck-gray-b shadow-card overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>{mod.title}</h3>
                        <span className={`chip text-xs ${mod.isActive?"chip-green":"chip-gray"}`}>{mod.isActive?"Active":"Hidden"}</span>
                        <span className="chip chip-blue text-xs">{mod.resources?.length||0} files</span>
                      </div>
                      {mod.description && <p className="text-ck-muted text-xs mt-1">{mod.description}</p>}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={()=>toggleMod(mod._id,mod.isActive)} className="text-xs border border-ck-gray-b text-ck-muted px-3 py-1.5 rounded-xl hover:bg-ck-gray transition font-semibold">
                        {mod.isActive?"Hide":"Show"}
                      </button>
                      <label className={`text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer transition ${uploading===mod._id?"bg-gray-200 text-gray-400":"bg-ck-orange text-white hover:bg-ck-orange-d"}`}>
                        {uploading===mod._id?"Uploading…":"+ Upload"}
                        <input type="file" className="hidden" accept=".pdf,.ppt,.pptx,.doc,.docx,.mp4"
                          disabled={uploading===mod._id} onChange={e=>upload(mod._id,e)}/>
                      </label>
                    </div>
                  </div>
                  {mod.resources?.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {mod.resources.map(r=>(
                        <div key={r._id} className="flex items-center gap-3 p-2.5 bg-ck-gray rounded-xl border border-ck-gray-b">
                          <span className="text-lg">{FILE_ICONS[r.fileType]||"📎"}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-ck-text truncate">{r.fileName}</p>
                            <p className="text-xs text-ck-muted uppercase">{r.fileType}</p>
                          </div>
                          <a href={r.fileUrl} target="_blank" rel="noreferrer" className="chip chip-blue text-xs">View</a>
                          <button onClick={()=>deleteRes(mod._id,r._id)} className="text-xs text-red-500 hover:text-red-700 font-bold px-2">✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
