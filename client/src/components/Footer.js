import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div style={{background:"#050E1F"}} className="text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0"
                  style={{background:"linear-gradient(135deg,#0055B3,#003D82)"}}>
                  <img
                    src="https://www.cybagekhushboo.org/media/1133/khushboo-logo.png"
                    alt="CybageKhushboo"
                    className="w-full h-full object-cover"
                    onError={e => { e.target.style.display="none"; }}
                  />
                </div>
                <div>
                  <p className="font-black text-base" style={{fontFamily:"Sora,sans-serif"}}>CybageKhushboo</p>
                  <p className="text-gray-400 text-xs">Charitable Trust</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                Spreading the fragrance of literacy. A self-sustained NGO and philanthropic arm of Cybage Software Pvt. Ltd., empowering students since 2009.
              </p>
              <div className="flex gap-3">
                {[
                  { label:"FB", url:"https://www.facebook.com/CybageKhushboo/" },
                  { label:"IN", url:"https://www.instagram.com/cybagekhushboo/" },
                  { label:"LI", url:"https://www.linkedin.com/company/cybage-software" },
                  { label:"YT", url:"https://youtube.com" },
                ].map(s => (
                  <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
                    className="w-9 h-9 rounded-xl border border-gray-700 flex items-center justify-center text-xs text-gray-400 hover:text-white hover:border-ck-blue hover:bg-ck-blue transition-all font-bold">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-ck-orange mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {[{l:"Home",t:"/"},{l:"About Us",t:"/about"},{l:"Scholarship",t:"/scholarship"},{l:"Testimonials",t:"/testimonials"},{l:"Contact",t:"/contact"}].map(i => (
                  <li key={i.l}><Link to={i.t} className="text-gray-400 hover:text-white text-sm transition font-medium">{i.l}</Link></li>
                ))}
              </ul>
            </div>

            {/* MentorLink */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-ck-orange mb-5">MentorLink</h4>
              <ul className="space-y-3">
                {[{l:"Mentee Portal",t:"/login"},{l:"Mentor Portal",t:"/login"},{l:"Register",t:"/register"},{l:"Need Analysis",t:"/login"},{l:"Admin Access",t:"/login"}].map(i => (
                  <li key={i.l}><Link to={i.t} className="text-gray-400 hover:text-white text-sm transition font-medium">{i.l}</Link></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-ck-orange mb-5">Contact Us</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="mailto:csr_team@cybage.com" className="hover:text-white transition font-medium">csr_team@cybage.com</a></li>
                <li><a href="tel:02066041700" className="hover:text-white transition">020-66041700 Extn:6619</a></li>
                <li><a href="tel:7447424631" className="hover:text-white transition">+91 74474 24631 (Rakesh)</a></li>
                <li className="text-gray-500 text-xs leading-relaxed pt-2">
                  Khushboo Charitable Trust<br/>
                  Cybage Towers, Survey No. 13A,<br/>
                  Kalyani Nagar, Pune – 411014
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© 2025 CybageKhushboo Charitable Trust. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-gray-600">
              <span>Privacy Policy</span>
              <span>·</span>
              <a href="https://www.cybage.com" target="_blank" rel="noreferrer" className="hover:text-gray-400 transition">Cybage Software</a>
              <span>·</span>
              <a href="https://www.cybageasha.org" target="_blank" rel="noreferrer" className="hover:text-gray-400 transition">CybageAsha</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
