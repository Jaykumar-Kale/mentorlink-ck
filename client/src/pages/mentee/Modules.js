
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../utils/api";
import toast from "react-hot-toast";

const FILE_ICONS = { pdf:"📄", ppt:"📊", pptx:"📊", doc:"📝", docx:"📝", video:"🎬", other:"📎" };
const FALLBACK_IMGS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80",
];

export default function MenteeModules() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    api.get("/modules")
      .then(r => setModules(r.data.modules))
      .catch(() => toast.error("Failed to load modules"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout>
      <div className="page-hero">
        <h1 className="text-4xl font-black text-white" style={{fontFamily:"Sora,sans-serif"}}>Learning Modules</h1>
        <p className="text-blue-300 text-sm mt-2">Scholar › Modules</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-ck-muted">Loading modules…</div>
        ) : modules.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl mb-3">📚</div>
            <p className="font-bold text-ck-dark text-lg">No modules yet</p>
            <p className="text-ck-muted text-sm mt-1">CybageKhushboo team will upload learning materials soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod, idx) => (
              <div key={mod._id} className="card overflow-hidden">
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={mod.coverImage || FALLBACK_IMGS[idx % FALLBACK_IMGS.length]}
                    alt={mod.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={e => { e.target.src = FALLBACK_IMGS[idx % FALLBACK_IMGS.length]; }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="chip chip-blue text-xs shadow-sm">Module {String(idx+1).padStart(2,"0")}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-black text-ck-dark text-sm mb-1" style={{fontFamily:"Sora,sans-serif"}}>{mod.title}</h3>
                  {mod.description && <p className="text-ck-muted text-xs leading-relaxed mb-3">{mod.description}</p>}
                  <button
                    onClick={() => setExpanded(expanded === mod._id ? null : mod._id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-ck-blue hover:text-ck-blue-d transition">
                    {expanded === mod._id ? "▲ Hide" : "▼ View"} resources
                    <span className="chip chip-blue ml-1">{mod.resources?.length || 0}</span>
                  </button>
                  {expanded === mod._id && (
                    <div className="mt-3 space-y-2 border-t border-ck-gray-b pt-3">
                      {mod.resources?.length === 0 && <p className="text-xs text-ck-muted italic">No files uploaded yet.</p>}
                      {mod.resources?.map(r => (
                        <a key={r._id} href={r.fileUrl} target="_blank" rel="noreferrer"
                          className="flex items-center gap-2.5 p-2.5 rounded-xl bg-ck-gray hover:bg-ck-blue-xl border border-transparent hover:border-ck-blue-l transition">
                          <span className="text-base">{FILE_ICONS[r.fileType] || "📎"}</span>
                          <span className="text-xs font-semibold text-ck-text hover:text-ck-blue truncate flex-1">{r.fileName}</span>
                          <span className="chip chip-gray text-xs uppercase">{r.fileType}</span>
                        </a>
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
