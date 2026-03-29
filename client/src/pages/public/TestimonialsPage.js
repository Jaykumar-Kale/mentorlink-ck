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

const TESTIMONIALS = [
  { name: "Pragati Kapse", role: "QA Engineer", company: "Cybage Software", img: "https://www.cybagekhushboo.org/media/1248/08.jpg",
    text: "Today, I feel honored to say that I am a Cybagian. I came across an article about the CybageKhushboo scholarship in a newspaper in 2012. The scholarship has helped me to pursue my education, which would have otherwise come to a standstill. Apart from the funding, CybageKhushboo trained me to improve my soft skills. CybageKhushboo is doing a laudable job by providing aid to needy students." },
  { name: "Amita Nilesh Hendre", role: "Graphic Designer", company: "A2 Digital Solution", img: "https://www.cybagekhushboo.org/media/8433/untitled-design.jpg",
    text: "Receiving the CybageKhushboo scholarship in 2019-2020 was a turning point in my life. It lifted the financial burden off my shoulders and allowed me to focus entirely on my BSc in Animation. More than just financial aid, CybageKhushboo offered constant encouragement and mentorship. Today, I work as a Graphic Designer and have received awards like Star is Born and Employee of the Month." },
  { name: "Anushka Dilip Shinde", role: "Staff Nurse", company: "Deenanath Mangeshkar Hospital", img: "https://www.cybagekhushboo.org/media/8434/untitled-design-1.jpg",
    text: "I come from a small farming family in Junnar, where financial hardship was a part of everyday life. During the lockdown, I worked at a daily wage job just to save for my nursing education. The CybageKhushboo scholarship lifted a huge burden from my shoulders. Today, I proudly serve as a staff nurse at Deenanath Mangeshkar Hospital." },
  { name: "Rutuja Sandip Gavhane", role: "Software Engineer", company: "Bgauss Auto", img: "https://www.cybagekhushboo.org/media/8435/untitled-design-1.jpg",
    text: "Growing up in a drought-affected village, affording engineering education felt like a distant dream. My father used his hard-earned savings and LIC policy to support my studies. That is when CybageKhushboo stepped in. The scholarship relieved my family from financial stress and allowed me to focus on my education at College of Engineering Pune." },
  { name: "Sachin Pandurang Jadhav", role: "Design Engineer", company: "Paccar India Pvt. Ltd.", img: "https://www.cybagekhushboo.org/media/8436/untitled-design-1.jpg",
    text: "My journey from a small farming background in Miraj to becoming a Design Engineer has been full of challenges. With my father earning less than ₹1 lakh a year, affording engineering felt nearly impossible. Receiving the CybageKhushboo scholarship changed everything — it eased financial struggles and helped build essential soft skills. Today I work as a Design Engineer with annual package of ₹9.15 LPA." },
  { name: "Sakshita Shahadatta Giri", role: "Assistant System Engineer", company: "Tata Consultancy Services", img: "https://www.cybagekhushboo.org/media/8437/untitled-design-1.jpg",
    text: "My father works as a bar bender, and my mother does basic tailoring work. With two younger sisters also studying, managing expenses was a daily struggle. Receiving the CybageKhushboo scholarship was a turning point — it lifted the heavy financial burden and gave me the confidence that someone believed in my potential. Today I am proud to be working at Tata Consultancy Services." },
];

export default function TestimonialsPage() {
  return (
    <div className="bg-white">
      <Navbar />
      <div style={{ paddingTop: "88px" }}>
        <div className="page-hero">
          <div className="max-w-4xl mx-auto">
            <span className="chip chip-orange mb-4" style={{display:"inline-flex"}}>Success Stories</span>
            <h1 className="text-5xl font-black text-white mb-5" style={{fontFamily:"Sora,sans-serif"}}>Testimonials</h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Real stories of transformation — from financial hardship to professional success, powered by CybageKhushboo.
            </p>
          </div>
        </div>

        {/* Animated Stats */}
        <section className="section-sm bg-ck-blue-xl px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: 6373, suffix: "+", label: "Scholarships Given" },
              { value: 2767, suffix: "+", label: "Students Placed" },
              { value: 8222, suffix: "+", label: "Lives Impacted" },
              { value: 100,  suffix: "%", label: "Transparent Process" },
            ].map(s => (
              <div key={s.label} className="text-center p-4">
                <p className="text-3xl font-black text-ck-blue" style={{fontFamily:"Sora,sans-serif"}}>
                  <AnimatedCounter target={s.value} suffix={s.suffix}/>
                </p>
                <p className="text-ck-muted text-sm mt-1 font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials grid */}
        <section className="section max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card p-6 flex flex-col">
                <div className="text-4xl text-ck-blue/20 font-black mb-4" style={{fontFamily:"Georgia,serif"}}>"</div>
                <p className="text-ck-text text-sm leading-relaxed flex-1 mb-6">{t.text}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-ck-gray">
                  <img src={t.img} alt={t.name}
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                    onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=0055B3&color=fff&size=48&bold=true`; }}
                  />
                  <div>
                    <p className="font-bold text-ck-dark text-sm">{t.name}</p>
                    <p className="text-ck-orange text-xs font-semibold">{t.role}</p>
                    <p className="text-ck-muted text-xs">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="section-sm px-6" style={{background:"linear-gradient(135deg,#0055B3,#003D82)"}}>
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl font-black mb-3" style={{fontFamily:"Sora,sans-serif"}}>Your Story Could Be Next</h2>
            <p className="text-blue-200 mb-6">Apply for the CybageKhushboo scholarship and begin your transformation.</p>
            <Link to="/scholarship" className="btn-primary">Apply for Scholarship</Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
