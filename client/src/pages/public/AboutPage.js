import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function AnimatedCounter({ target, suffix = "+" }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!visible) return;
    const num = parseInt(String(target).replace(/[^0-9]/g, ""));
    let start = 0;
    const step = Math.ceil(num / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <span ref={ref}>{count.toLocaleString("en-IN")}{suffix}</span>;
}

const TRUSTEES = [
  { name: "Arun Nathani", role: "CEO & Managing Director, Cybage", img: "https://www.cybagekhushboo.org/media/1137/arun-nathani.png", bio: "Founder and CEO of Cybage Software. Started as a software design engineer in USA, returned to India in the early 90s and founded Cybage. A strong believer in empowerment of society through education and instrumental in establishing CybageKhushboo and CybageAsha. Recipient of CEO of the Year Award at National Awards in IT Excellence." },
  { name: "Ritu Nathani", role: "Director Cybage, Managing Trustee CybageKhushboo", img: "https://www.cybagekhushboo.org/media/1139/ritu-nathani.png", bio: "A dentist by qualification and philanthropist by passion. Co-founder and director of Cybage Software. Honored as a Leading Consultant at Women Leaders in India Awards. She heads both wings of Cybage CSR — CybageKhushboo and CybageAsha. Was chapter chair of Young Indians (Yi) Pune chapter 2012-13." },
  { name: "Geeta Lalwani", role: "Head-Operations, Cybage CSR GNR", img: "https://www.cybagekhushboo.org/media/1256/geeta-lalwani.png", bio: "Heads the operations of Cybage CSR GNR, overseeing execution of CybageKhushboo's scholarship programs, skill development centers, and all outreach initiatives. Brings meticulous operational expertise to ensure the trust's mandate is fulfilled with transparency and efficiency." },
];

const TIMELINE = [
  { year: "2009", event: "Khushboo Charitable Trust registered. CybageKhushboo born — a philanthropic arm of Cybage Software Pvt. Ltd." },
  { year: "2010", event: "First scholarship students supported. Program expands to engineering, diploma and medical courses." },
  { year: "2015", event: "Skill development centers established in urban slum communities. Digital literacy bus launched." },
  { year: "2018", event: "Scholarship rolls cross 100 students. Adult literacy classes and secondary education funding added." },
  { year: "2020", event: "CSR-1 certification obtained, enabling corporate partnership. Talent development sessions begin." },
  { year: "2022", event: "Scholarship count crosses 250 students. Soft skills training — Communication, Email Etiquette, Interview Skills — added for all scholars." },
  { year: "2023", event: "Scholarship rolls grow to 350+ students across 15 partner colleges in engineering, architecture, MBA, medicine and related fields." },
  { year: "2024", event: "Total 6,373+ scholarships given. 2,767+ students placed. ₹1.86 crore distributed in a single scholarship event." },
  { year: "2025", event: "MentorLink launched — structured mentorship platform connecting scholars with Cybagian volunteer mentors." },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <Navbar />
      <div style={{ paddingTop: "88px" }}>
        {/* Hero */}
        <div className="page-hero">
          <div className="max-w-4xl mx-auto">
            <span className="chip chip-orange mb-4 mx-auto" style={{display:"inline-flex"}}>About CybageKhushboo</span>
            <h1 className="text-5xl font-black text-white mb-5" style={{fontFamily:"Sora,sans-serif"}}>Our Story</h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
              Give a man a fish; you feed him for a day. Teach him how to fish; you feed him for life.
            </p>
          </div>
        </div>

        {/* Mission */}
        <section className="section max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-tag">Our Mission</span>
              <h2 className="text-3xl font-black text-ck-dark mb-5" style={{fontFamily:"Sora,sans-serif"}}>
                Bridging Disparities Through Education
              </h2>
              <p className="text-ck-muted leading-relaxed mb-5">
                CybageKhushboo is a self-sustained NGO and philanthropic arm of Cybage Software Pvt. Ltd. Since its inception in 2009, the Trust has been providing financial assistance to economically backward but promising students to help them fulfill their educational aspirations.
              </p>
              <p className="text-ck-muted leading-relaxed mb-5">
                CybageKhushboo grants scholarships to students pursuing professional courses in Engineering (B.E. and Diploma), Architecture, MBA, Hotel Management, Medicine, Pharmacy, Dentistry, Homeopathy, Nursing, and Physiotherapy.
              </p>
              <p className="text-ck-muted leading-relaxed mb-8">
                Beyond monetary assistance, we conduct training sessions for beneficiaries — Spoken English, Communication Skills, Email Etiquette, Interview Skills, and Group Discussions.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Vision", text: "Cybage, through CSR initiatives, aims at bridging disparities through sustainable community development — holistic development of underprivileged sections of society to provide equal opportunity to all." },
                  { label: "Mission", text: "To achieve our vision through rural upliftment, community development, and social welfare verticals of CybageAsha and education vertical of CybageKhushboo." },
                  { label: "Core Values", text: "Clean and ethical mechanism of work — energy, enthusiasm, perseverance, inclusiveness, transparency, participation, non-dependence and self-reliance in a process-oriented, data-driven manner." },
                ].map(v => (
                  <div key={v.label} className="bg-ck-blue-xl rounded-2xl p-5 border-l-4 border-ck-blue">
                    <p className="font-black text-ck-blue text-sm mb-1">{v.label}</p>
                    <p className="text-ck-text text-sm leading-relaxed">{v.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img src="https://www.cybagekhushboo.org/media/7745/img_1524.jpg" alt="CybageKhushboo"
                className="w-full rounded-3xl shadow-card-lg object-cover" style={{ height: "500px" }}
                onError={e => { e.target.src = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80"; }}
              />
            </div>
          </div>
        </section>

        {/* Animated stats */}
        <section className="section-sm px-6" style={{background:"linear-gradient(135deg,#0055B3,#003D82)"}}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: 8222, suffix: "+", label: "Students Benefited" },
              { value: 6373, suffix: "+", label: "Scholarships Given" },
              { value: 2767, suffix: "+", label: "Students Placed" },
              { value: 15,   suffix: "+", label: "Partner Colleges" },
            ].map(s => (
              <div key={s.label} className="p-4">
                <p className="text-4xl lg:text-5xl font-black text-white" style={{fontFamily:"Sora,sans-serif"}}>
                  <AnimatedCounter target={s.value} suffix={s.suffix}/>
                </p>
                <p className="text-blue-200 text-sm mt-2 font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="section bg-ck-gray px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="section-tag">Our Journey</span>
              <h2 className="text-3xl font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>16 Years of Impact</h2>
            </div>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-ck-gray-b"/>
              <div className="space-y-6">
                {TIMELINE.map((t, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-16 flex-shrink-0 flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full bg-ck-blue border-4 border-white shadow-blue flex-shrink-0 relative z-10"/>
                    </div>
                    <div className="bg-white rounded-2xl shadow-card border border-ck-gray-b p-5 flex-1 -mt-2.5">
                      <span className="chip chip-blue text-xs mb-2">{t.year}</span>
                      <p className="text-ck-text text-sm leading-relaxed">{t.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trustees */}
        <section className="section max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="section-tag">Leadership</span>
            <h2 className="text-3xl font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>Our Trustees</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TRUSTEES.map(t => (
              <div key={t.name} className="card p-6 text-center group">
                <div className="w-28 h-28 rounded-2xl overflow-hidden mx-auto mb-4 shadow-card border-4 border-ck-blue-l">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover"
                    onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=0055B3&color=fff&size=112&bold=true`; }}
                  />
                </div>
                <h3 className="font-black text-ck-dark text-lg mb-1" style={{fontFamily:"Sora,sans-serif"}}>{t.name}</h3>
                <p className="text-ck-orange text-sm font-bold mb-3">{t.role}</p>
                <p className="text-ck-muted text-sm leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="section-sm px-6" style={{background:"linear-gradient(135deg,#0055B3,#003D82)"}}>
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl font-black mb-4" style={{fontFamily:"Sora,sans-serif"}}>Be Part of Our Story</h2>
            <p className="text-blue-200 mb-8">Join as a mentor, apply for scholarship, or support our mission.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/scholarship" className="btn-primary">Apply for Scholarship</Link>
              <Link to="/register" className="btn-ghost-white">Become a Mentor</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
