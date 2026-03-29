import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

/* ── Animated Counter (same pattern as MentorLink-Mudita) ── */
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

const STATS = [
  { value: 8222, suffix: "+", label: "Students Benefited", icon: "🎓" },
  { value: 6373, suffix: "+", label: "Scholarships Given", icon: "📜" },
  { value: 2767, suffix: "+", label: "Students Placed", icon: "💼" },
  { value: 15,   suffix: "+", label: "Partner Colleges",  icon: "🏛️" },
];

const EVENTS = [
  {
    date: "Mar 2025", title: "Scholarship Distribution Event",
    desc: "CybageKhushboo hosted a scholarship distribution ceremony — a day of inspiration & empowerment for 187 deserving STEM students.",
    img: "https://www.cybagekhushboo.org/media/8410/img_6281_11zon.jpg",
    tag: "Scholarship",
  },
  {
    date: "Feb 2025", title: "₹1 Crore Scholarship Distribution",
    desc: "CybageKhushboo proudly distributed scholarships worth over ₹1 crore to 187 deserving STEM students, ready to shape the future.",
    img: "https://www.cybagekhushboo.org/media/8411/dsc04118_11zon.jpg",
    tag: "Scholarship",
  },
  {
    date: "Dec 2024", title: "291 Students Empowered",
    desc: "Second round of scholarship distribution — empowering 291 students with ₹1.86 crore in scholarships across 85+ colleges.",
    img: "https://www.cybagekhushboo.org/media/8412/dsc00026-1-_11zon.jpg",
    tag: "Event",
  },
  {
    date: "Oct 2024", title: "₹1.32 Crore Distribution",
    desc: "First scholarship round for 2024-25 academic year — ₹1.32 crore awarded to 254 deserving students across 85 colleges.",
    img: "https://www.cybagekhushboo.org/media/8413/dsc09100_11zon.jpg",
    tag: "Event",
  },
];

const GALLERY = [
  "https://www.cybagekhushboo.org/media/8399/dsc00026-1-_11zon.jpg",
  "https://www.cybagekhushboo.org/media/8402/dsc00080-1-_11zon.jpg",
  "https://www.cybagekhushboo.org/media/8400/dsc00034_11zon.jpg",
  "https://www.cybagekhushboo.org/media/8404/dsc09858-1-_11zon.jpg",
  "https://www.cybagekhushboo.org/media/8405/dsc09889_11zon.jpg",
  "https://www.cybagekhushboo.org/media/8403/dsc00121_11zon.jpg",
  "https://www.cybagekhushboo.org/media/8360/dsc03802_11zon.jpg",
  "https://www.cybagekhushboo.org/media/8362/dsc04118_11zon.jpg",
];

const COLLEGES = [
  "College of Engineering Pune", "Vishwakarma Institute of Technology", "BJ Medical College",
  "Cummins College of Engineering", "Pune Institute of Computer Technology",
  "COEP Technological University", "MIT College of Engineering", "Symbiosis Institute of Technology",
  "Dr. D.Y. Patil Medical College", "Sinhgad College of Engineering",
  "Marathwada Mitra Mandal", "Army Institute of Technology", "JSPM", "NBN Sinhgad", "Indira College",
];

const SELECTED_STUDENTS = [
  { name: "Pragati Kapse",       college: "COEP",    stream: "Engineering", year: "2012", company: "Cybage Software" },
  { name: "Amita Hendre",        college: "MITADT",  stream: "Animation",   year: "2019", company: "A2 Digital Solution" },
  { name: "Anushka Shinde",      college: "BVDU",    stream: "Nursing",     year: "2020", company: "Deenanath Hospital" },
  { name: "Rutuja Gavhane",      college: "COEP",    stream: "Engineering", year: "2021", company: "Bgauss Auto" },
  { name: "Sachin Jadhav",       college: "VIT",     stream: "Engineering", year: "2021", company: "Paccar India" },
  { name: "Sakshita Giri",       college: "PICT",    stream: "Engineering", year: "2022", company: "TCS" },
];

export default function HomePage() {
  return (
    <div className="bg-white">
      <Navbar />
      <div style={{ paddingTop: "88px" }}>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center overflow-hidden"
          style={{ background: "linear-gradient(135deg,#050E1F 0%,#0A1A3A 40%,#003D82 100%)" }}>
          {/* dot grid */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}/>
          {/* radial glows */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #F97316 0%, transparent 70%)", filter: "blur(60px)" }}/>
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #0055B3 0%, transparent 70%)", filter: "blur(60px)" }}/>

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="animate-fade-up">
              <div className="chip chip-orange mb-6">
                <span className="w-2 h-2 bg-ck-orange rounded-full animate-pulse"/>
                CybageKhushboo Charitable Trust · Est. 2009
              </div>
              <h1 className="text-5xl sm:text-6xl font-black text-white leading-[1.08] mb-6" style={{fontFamily:"Sora,sans-serif"}}>
                Spreading the<br/>
                <span style={{background:"linear-gradient(135deg,#F97316,#FBBF24)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
                  Fragrance
                </span>
                <br/>of Literacy
              </h1>
              <p className="text-lg text-blue-200 leading-relaxed mb-8 max-w-xl">
                Empowering deserving students through scholarships, skill development, and now — structured mentorship through <strong className="text-white">MentorLink</strong>.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/scholarship" className="btn-primary">Apply for Scholarship</Link>
                <Link to="/login" className="btn-ghost-white">MentorLink Portal →</Link>
              </div>

              {/* Mini stats in hero */}
              <div className="mt-10 grid grid-cols-2 gap-4">
                {STATS.map(s => (
                  <div key={s.label} className="glass-card p-4">
                    <p className="text-2xl font-black text-ck-orange" style={{fontFamily:"Sora,sans-serif"}}>
                      <AnimatedCounter target={s.value} suffix={s.suffix}/>
                    </p>
                    <p className="text-xs text-blue-300 mt-1 font-semibold">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-6 rounded-3xl opacity-25"
                  style={{ background: "linear-gradient(135deg,#F97316,#0055B3)", filter: "blur(50px)" }}/>
                <img
                  src="https://www.cybagekhushboo.org/media/7742/img_3557.jpg"
                  alt="CybageKhushboo scholars"
                  className="relative rounded-3xl object-cover shadow-2xl w-full"
                  style={{ height: "500px" }}
                  onError={e => { e.target.src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80"; }}
                />
                {/* Floating badge */}
                <div className="absolute -bottom-5 -left-5 bg-ck-orange text-white rounded-2xl px-5 py-3 shadow-orange animate-float">
                  <p className="font-black text-xl" style={{fontFamily:"Sora,sans-serif"}}>₹1.86 Cr</p>
                  <p className="text-xs text-orange-100">Distributed Dec 2024</p>
                </div>
                <div className="absolute -top-4 -right-4 bg-white text-ck-dark rounded-2xl px-4 py-3 shadow-card animate-float" style={{animationDelay:"1.5s"}}>
                  <p className="font-black text-lg" style={{fontFamily:"Sora,sans-serif"}}>16 Years</p>
                  <p className="text-xs text-ck-muted">of Impact</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── IMPACT NUMBERS (Animated) ── */}
        <section className="section-sm px-6" style={{background:"linear-gradient(135deg,#0055B3,#003D82)"}}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
              {[
                { value: 8222, suffix: "+", label: "Students Benefited", icon: "🎓" },
                { value: 6373, suffix: "+", label: "Scholarships Given",  icon: "📜" },
                { value: 2767, suffix: "+", label: "Students Placed",     icon: "💼" },
                { value: 15,   suffix: "+", label: "Partner Colleges",    icon: "🏛️" },
              ].map(s => (
                <div key={s.label} className="p-4">
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <p className="text-4xl lg:text-5xl font-black text-white" style={{fontFamily:"Sora,sans-serif"}}>
                    <AnimatedCounter target={s.value} suffix={s.suffix}/>
                  </p>
                  <p className="text-blue-200 text-sm mt-2 font-semibold">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="section max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://www.cybagekhushboo.org/media/7745/img_1524.jpg"
                alt="Skill development"
                className="rounded-3xl shadow-card-lg object-cover w-full"
                style={{ height: "440px" }}
                onError={e => { e.target.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"; }}
              />
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-card-lg p-5 border border-ck-gray-b">
                <p className="text-xs text-ck-muted font-semibold uppercase tracking-wider mb-1">Founded</p>
                <p className="text-3xl font-black text-ck-blue" style={{fontFamily:"Sora,sans-serif"}}>2009</p>
                <p className="text-xs text-ck-muted mt-1">16 years of impact</p>
              </div>
            </div>
            <div>
              <span className="section-tag">Who We Are</span>
              <h2 className="text-4xl font-black text-ck-dark mb-5 leading-tight" style={{fontFamily:"Sora,sans-serif"}}>
                Give a man a fish or teach him how to fish
              </h2>
              <p className="text-ck-muted leading-relaxed mb-4">
                Khushboo Charitable Trust — a self-sustained NGO and philanthropic arm of Cybage Software Pvt. Ltd. — believes in the power of education. Right from its inception in 2009, the Trust has been constantly providing financial assistance to economically backward but promising students.
              </p>
              <p className="text-ck-muted leading-relaxed mb-8">
                The Trust is the brainchild of <strong className="text-ck-dark">Mr. Arun Nathani</strong>, CEO and MD of Cybage, and his wife <strong className="text-ck-dark">Mrs. Ritu Nathani</strong>, Director, Cybage. Under Cybage's senior management guidance and active participation from Cybagian volunteers.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: "🎓", label: "Engineering Scholarships", sub: "B.E., Diploma, Architecture" },
                  { icon: "🏥", label: "Medical Education", sub: "MBBS, Pharmacy, Nursing" },
                  { icon: "💻", label: "Skill Development", sub: "Digital literacy & vocational" },
                  { icon: "🤝", label: "MentorLink", sub: "Industry mentorship program" },
                ].map(f => (
                  <div key={f.label} className="bg-ck-blue-xl rounded-2xl p-4 border border-ck-blue-l">
                    <span className="text-2xl">{f.icon}</span>
                    <p className="font-bold text-ck-dark text-sm mt-2">{f.label}</p>
                    <p className="text-ck-muted text-xs mt-0.5">{f.sub}</p>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-secondary">Learn Our Story →</Link>
            </div>
          </div>
        </section>

        {/* ── MENTORLINK FEATURE ── */}
        <section className="section-sm px-6" style={{background:"linear-gradient(135deg,#F0F7FF 0%,#E8F0FF 100%)"}}>
          <div className="max-w-7xl mx-auto">
            <div className="rounded-3xl overflow-hidden" style={{background:"#050E1F"}}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-10 lg:p-14 text-white">
                  <div className="chip chip-orange mb-6">🔗 NEW — MentorLink Programme</div>
                  <h2 className="text-3xl lg:text-4xl font-black mb-5 leading-tight" style={{fontFamily:"Sora,sans-serif"}}>
                    Structured Mentorship<br/>
                    <span style={{color:"#F97316"}}>by Cybagians, for Scholars</span>
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-8">
                    MentorLink connects CybageKhushboo scholars with Cybage Software employees who volunteer their expertise. Through smart matching, every student gets a mentor aligned to their career goals.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {[
                      { icon: "🤖", label: "Smart Auto-Matching" },
                      { icon: "📅", label: "Session Scheduling" },
                      { icon: "📚", label: "Learning Modules" },
                      { icon: "📊", label: "Progress Dashboard" },
                      { icon: "🎯", label: "Need Analysis Form" },
                      { icon: "📋", label: "Session Feedback" },
                    ].map(f => (
                      <div key={f.label} className="flex items-center gap-2 rounded-xl p-3" style={{background:"rgba(255,255,255,0.07)"}}>
                        <span className="text-lg">{f.icon}</span>
                        <span className="text-xs font-semibold text-gray-300">{f.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Link to="/login" className="btn-primary">Access MentorLink</Link>
                    <Link to="/register" className="btn-ghost-white">Become a Mentor</Link>
                  </div>
                </div>
                <div className="hidden lg:flex items-end justify-center p-8">
                  <img
                    src="https://www.cybagekhushboo.org/media/7746/college-tie-ups-2.jpg"
                    alt="mentorship"
                    className="rounded-2xl object-cover w-full shadow-2xl"
                    style={{ maxHeight: "400px" }}
                    onError={e => { e.target.src = "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80"; }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SELECTED STUDENTS ── */}
        <section className="section max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="section-tag">Our Scholars</span>
              <h2 className="text-3xl font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>Students Selected Till Date</h2>
              <p className="text-ck-muted text-sm mt-2">CybageKhushboo scholars who secured placements through hard work & support</p>
            </div>
            <Link to="/testimonials" className="text-sm font-bold text-ck-blue hover:text-ck-blue-d transition">View All Stories →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SELECTED_STUDENTS.map((s, i) => (
              <div key={i} className="card p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                  style={{background:`linear-gradient(135deg, ${["#0055B3","#F97316","#059669","#7C3AED","#0891B2","#DC2626"][i % 6]}, ${["#003D82","#EA6005","#047857","#6D28D9","#0369A1","#B91C1C"][i % 6]})`}}>
                  {s.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-ck-dark text-sm truncate">{s.name}</p>
                  <p className="text-ck-orange text-xs font-semibold">{s.company}</p>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    <span className="chip chip-blue text-xs px-2 py-0.5">{s.stream}</span>
                    <span className="chip chip-gray text-xs px-2 py-0.5">{s.college}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-ck-blue-xl rounded-2xl p-6 border border-ck-blue-l text-center">
            <p className="text-ck-blue font-black text-xl" style={{fontFamily:"Sora,sans-serif"}}>
              <AnimatedCounter target={2767} suffix="+"/> Students Placed
            </p>
            <p className="text-ck-muted text-sm mt-1">across Engineering, Medical, IT & more fields since 2009</p>
          </div>
        </section>

        {/* ── RECENT EVENTS ── */}
        <section className="section bg-ck-gray px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="section-tag">Latest News</span>
                <h2 className="text-3xl font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>Recent Events</h2>
              </div>
              <a href="https://www.cybagekhushboo.org" target="_blank" rel="noreferrer"
                className="text-sm font-bold text-ck-blue hover:text-ck-blue-d transition">View All →</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {EVENTS.map((e, i) => (
                <div key={i} className="card overflow-hidden group cursor-pointer">
                  <div className="h-48 overflow-hidden">
                    <img src={e.img} alt={e.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={ev => { ev.target.src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80"; }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="chip chip-orange text-xs">{e.tag}</span>
                      <span className="text-xs text-ck-muted font-semibold">{e.date}</span>
                    </div>
                    <h3 className="font-bold text-ck-dark text-sm mb-2 leading-tight">{e.title}</h3>
                    <p className="text-ck-muted text-xs leading-relaxed line-clamp-3">{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="section max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="section-tag">Our Impact</span>
            <h2 className="text-3xl font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>Photo Gallery</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {GALLERY.map((img, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl aspect-square group cursor-pointer">
                <img src={img} alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={e => { e.target.src = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80"; }}
                />
                <div className="absolute inset-0 bg-ck-blue opacity-0 group-hover:opacity-30 transition-opacity"/>
              </div>
            ))}
          </div>
        </section>

        {/* ── PARTNER COLLEGES ── */}
        <section className="section-sm max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <span className="section-tag">Our Network</span>
            <h2 className="text-3xl font-black text-ck-dark" style={{fontFamily:"Sora,sans-serif"}}>Partner Colleges</h2>
            <p className="text-ck-muted mt-3">We extend scholarships to outstanding students from 15+ prestigious institutions</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {COLLEGES.map(c => (
              <span key={c} className="bg-white border border-ck-gray-b px-5 py-2.5 rounded-full text-sm font-semibold text-ck-text hover:border-ck-blue hover:text-ck-blue transition-all shadow-sm cursor-default">
                {c}
              </span>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section-sm px-6" style={{background:"linear-gradient(135deg,#F97316,#EA6005)"}}>
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-black mb-4" style={{fontFamily:"Sora,sans-serif"}}>
              Ready to transform a student's life?
            </h2>
            <p className="text-orange-100 mb-8 text-lg">
              Applications for CybageKhushboo Scholarship 2025-26 open July 1, 2025.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/scholarship" className="bg-white text-ck-orange font-black px-8 py-3.5 rounded-xl hover:bg-orange-50 transition shadow-lg text-sm">
                Apply for Scholarship
              </Link>
              <Link to="/register" className="btn-ghost-white">Join as Mentor</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
