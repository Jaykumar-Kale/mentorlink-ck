import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

const DOCS = [
  "One passport size photograph",
  "Mark sheets — 10th, 11th, 12th, Diploma/Degree",
  "CET / NEET / Entrance exam mark sheet",
  "School-leaving certificate / Bonafide / 10th certificate",
  "Aadhar Card (photocopy)",
  "Caste certificate / Non-creamy layer certificate",
  "Family income documents",
  "Parent bank passbook (last 6 months)",
  "Student bank passbook",
];

const PROCESS = [
  { step: "01", title: "Scrutinise", icon: "🔍", desc: "All submitted forms are thoroughly reviewed for completeness and eligibility." },
  { step: "02", title: "Verify", icon: "📋", desc: "Documents are verified for authenticity and accuracy." },
  { step: "03", title: "Phone Interview", icon: "📞", desc: "A telephonic interview to assess the student's situation and aspirations." },
  { step: "04", title: "In-Person Interview", icon: "👤", desc: "Face-to-face interview to assess academic capability and drive." },
  { step: "05", title: "Home Visit", icon: "🏠", desc: "A home visit to understand the student's family situation firsthand." },
  { step: "06", title: "Fee Assessment", icon: "📊", desc: "Assessment of actual fees required and disbursement of scholarship." },
];

const OFFICES = [
  { city: "Pune HQ", phone: "020-66041700 (Extn:6619)", mobile: "74474 24631 (Rakesh)", addr: "Cybage Towers, Survey No. 13A/1+2+3/1, Kalyani Nagar, Pune – 411014 Maharashtra" },
  { city: "Ahmedabad", phone: "79-66737000 (Extn:5348)", mobile: "8866043163 (Kiran)", addr: "Infocity Tower II, 2nd Floor, Gandhi Nagar – 382 007 Gujarat" },
  { city: "Hyderabad", phone: "040-66294100 (Ext:4121)", mobile: "9100766614 (Suresh)", addr: "DLF Cyber City (SEZ), 7th Floor, Block 2, Gachibowli, Hyderabad – 500 019" },
];

const COLLEGES = [
  "College of Engineering Pune","Vishwakarma Institute of Technology","BJ Medical College",
  "Cummins College of Engineering for Women","Pune Institute of Computer Technology",
  "COEP Technological University","MIT College of Engineering","Symbiosis Institute of Technology",
  "Dr. D.Y. Patil Medical College","Sinhgad College of Engineering","Marathwada Mitra Mandal",
  "NBN Sinhgad School of Engineering","Army Institute of Technology","Indira College of Engineering","JSPM",
];

export default function ScholarshipPage() {
  return (
    <div className="bg-white">
      <Navbar />
      <div style={{ paddingTop: "88px" }}>
        <div className="page-hero">
          <div className="max-w-4xl mx-auto">
            <div className="chip chip-orange mb-4" style={{display:"inline-flex"}}>Applications Open July 1 – August 15, 2025</div>
            <h1 className="text-5xl font-black text-white mb-5" style={{fontFamily:"Sora,sans-serif"}}>Scholarship Programme</h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              CybageKhushboo Scholarship Program 2025-26 — Empowering deserving students to pursue their higher education dreams.
            </p>
          </div>
        </div>

        {/* Eligibility + Docs */}
        <section className="section max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="section-tag">Who Can Apply</span>
              <h2 className="text-3xl font-black text-ck-dark mb-6" style={{fontFamily:"Sora,sans-serif"}}>Eligibility Criteria</h2>
              <div className="space-y-4">
                {[
                  { n: "01", text: "Passed 10th and 12th standards with minimum 60% marks" },
                  { n: "02", text: "Total annual family income less than ₹5 lakhs" },
                  { n: "03", text: "Currently pursuing: Engineering (B.E./Diploma), Architecture, MBA, Hotel Management, Medicine, Pharmacy, Dentistry, Homeopathy, Nursing, Physiotherapy" },
                  { n: "04", text: "Scholarship renewed yearly — requires submitting mark sheet, fee structure and bank details" },
                  { n: "05", text: "Scholarship discontinued if the student fails in any subject during the academic year" },
                  { n: "06", text: "Form must be completely and clearly filled — all fields are mandatory" },
                ].map(e => (
                  <div key={e.n} className="flex gap-4 bg-ck-blue-xl rounded-2xl p-4 border border-ck-blue-l">
                    <div className="w-8 h-8 bg-ck-blue text-white rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0">{e.n}</div>
                    <p className="text-ck-text text-sm leading-relaxed">{e.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="section-tag">Required Documents</span>
              <h2 className="text-3xl font-black text-ck-dark mb-6" style={{fontFamily:"Sora,sans-serif"}}>Documents Needed</h2>
              <div className="bg-white rounded-2xl shadow-card border border-ck-gray-b p-6">
                <ul className="space-y-3">
                  {DOCS.map((d, i) => (
                    <li key={i} className="flex items-start gap-3 py-2 border-b border-ck-gray last:border-0">
                      <div className="w-5 h-5 rounded-full bg-ck-orange/10 text-ck-orange flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
                      <span className="text-ck-text text-sm">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick links */}
              <div className="mt-6 bg-ck-blue-xl rounded-2xl p-5 border border-ck-blue-l">
                <p className="font-black text-ck-dark text-sm mb-3" style={{fontFamily:"Sora,sans-serif"}}>📄 Download Forms</p>
                <div className="space-y-2">
                  <a href="https://www.cybagekhushboo.org/media/1261/scholarship-form.pdf" target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-ck-blue text-sm font-semibold hover:underline">
                    ↓ Scholarship Application Form (PDF)
                  </a>
                  <a href="https://www.cybagekhushboo.org/media/1263/renewal-form.pdf" target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-ck-blue text-sm font-semibold hover:underline">
                    ↓ Renewal Form (PDF)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Selection Process */}
        <section className="section bg-ck-gray px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="section-tag">How It Works</span>
              <h2 className="text-3xl font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>Selection Process</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROCESS.map((p, i) => (
                <div key={i} className="card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{p.icon}</span>
                    <div>
                      <p className="text-xs font-black text-ck-orange uppercase tracking-wider">Step {p.step}</p>
                      <h3 className="font-black text-ck-dark text-lg" style={{fontFamily:"Sora,sans-serif"}}>{p.title}</h3>
                    </div>
                  </div>
                  <p className="text-ck-muted text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner colleges */}
        <section className="section max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <span className="section-tag">Our Network</span>
            <h2 className="text-3xl font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>Scholarship Partner Colleges</h2>
            <p className="text-ck-muted mt-3 max-w-xl mx-auto">We have tie-ups with these prestigious institutions to identify and support deserving students</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {COLLEGES.map(c => (
              <span key={c} className="bg-white border border-ck-gray-b px-5 py-2.5 rounded-full text-sm font-semibold text-ck-text hover:border-ck-blue hover:text-ck-blue transition-all shadow-sm cursor-default">
                {c}
              </span>
            ))}
          </div>
        </section>

        {/* Offices */}
        <section className="section-sm bg-ck-gray px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <span className="section-tag">Our Offices</span>
              <h2 className="text-3xl font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>Contact Offices</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {OFFICES.map(o => (
                <div key={o.city} className="card p-6">
                  <div className="chip chip-blue text-xs mb-4">{o.city}</div>
                  <p className="text-ck-muted text-xs mb-3 leading-relaxed">{o.addr}</p>
                  <p className="text-sm font-bold text-ck-dark">{o.phone}</p>
                  <p className="text-sm text-ck-muted">{o.mobile}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-sm px-6" style={{background:"linear-gradient(135deg,#F97316,#EA6005)"}}>
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl font-black mb-4" style={{fontFamily:"Sora,sans-serif"}}>Ready to Apply?</h2>
            <p className="text-orange-100 mb-8">Applications for 2025-26 open July 1 — August 15, 2025. Don't miss your chance!</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://www.cybagekhushboo.org" target="_blank" rel="noreferrer"
                className="bg-white text-ck-orange font-black px-8 py-3.5 rounded-xl hover:bg-orange-50 transition shadow-lg text-sm">
                Download Application Form
              </a>
              <Link to="/contact" className="btn-ghost-white">Contact Us</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
