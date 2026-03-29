import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import toast from "react-hot-toast";

const OFFICES = [
  { city: "Pune HQ", phone: "020-66041700 (Extn:6619)", mobile: "74474 24631 (Rakesh)", addr: "Cybage Towers, Survey No. 13A, Kalyani Nagar, Pune 411014" },
  { city: "Ahmedabad", phone: "79-66737000 (Extn:5348)", mobile: "8866043163 (Kiran)", addr: "Infocity Tower II, 2nd Floor, Gandhi Nagar 382007" },
  { city: "Hyderabad", phone: "040-66294100 (Ext:4121)", mobile: "9100766614 (Suresh)", addr: "DLF Cyber City, 7th Floor, Block 2, Gachibowli 500019" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault(); setSending(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success("Message sent! We will get back to you within 2 business days.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setSending(false);
  };

  return (
    <div className="bg-white">
      <Navbar />
      <div style={{ paddingTop: "88px" }}>
        <div className="page-hero">
          <div className="max-w-4xl mx-auto">
            <span className="chip chip-orange mb-4" style={{display:"inline-flex"}}>Get in Touch</span>
            <h1 className="text-5xl font-black text-white mb-5" style={{fontFamily:"Sora,sans-serif"}}>Contact Us</h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Have questions about the scholarship program or MentorLink? We are here to help.
            </p>
          </div>
        </div>

        <section className="section max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-5">
              <h2 className="text-2xl font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>Get In Touch</h2>
              <p className="text-ck-muted text-sm leading-relaxed">
                If you are someone in need of help, or someone who can help — reach out to us at any of our offices.
              </p>
              {OFFICES.map(o => (
                <div key={o.city} className="card p-5">
                  <div className="chip chip-blue text-xs mb-3">{o.city}</div>
                  <p className="text-ck-muted text-xs mb-2 leading-relaxed">{o.addr}</p>
                  <p className="text-sm font-bold text-ck-dark">{o.phone}</p>
                  <p className="text-sm text-ck-muted">{o.mobile}</p>
                </div>
              ))}
              <div className="card p-5">
                <p className="text-xs font-black uppercase tracking-wider text-ck-orange mb-2">Email</p>
                <a href="mailto:csr_team@cybage.com" className="font-bold text-ck-blue hover:underline text-sm">csr_team@cybage.com</a>
              </div>
              {/* Social links */}
              <div className="card p-5">
                <p className="text-xs font-black uppercase tracking-wider text-ck-orange mb-3">Follow Us</p>
                <div className="flex gap-3">
                  {[
                    { label: "Facebook", url: "https://www.facebook.com/CybageKhushboo/" },
                    { label: "Instagram", url: "https://www.instagram.com/cybagekhushboo/" },
                    { label: "LinkedIn", url: "https://www.linkedin.com/company/cybage-software" },
                  ].map(s => (
                    <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
                      className="text-xs font-bold text-ck-blue hover:underline">{s.label}</a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-card-lg border border-ck-gray-b p-8">
                <h3 className="text-xl font-black text-ck-dark mb-6" style={{fontFamily:"Sora,sans-serif"}}>Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input required className="form-input" value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                    </div>
                    <div>
                      <label className="form-label">Email *</label>
                      <input type="email" required className="form-input" value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
                    </div>
                    <div>
                      <label className="form-label">Phone</label>
                      <input className="form-input" value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" />
                    </div>
                    <div>
                      <label className="form-label">Subject *</label>
                      <select required className="form-input" value={form.subject}
                        onChange={e => setForm({ ...form, subject: e.target.value })}>
                        <option value="">Select subject</option>
                        <option>Scholarship Application</option>
                        <option>MentorLink Query</option>
                        <option>Renewal Scholarship</option>
                        <option>General Enquiry</option>
                        <option>Volunteer / Mentor</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Message *</label>
                    <textarea required rows={5} className="form-input" value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="How can we help you?" style={{ resize: "vertical" }}/>
                  </div>
                  <button type="submit" disabled={sending} className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60">
                    {sending ? "Sending..." : "Send Message →"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
