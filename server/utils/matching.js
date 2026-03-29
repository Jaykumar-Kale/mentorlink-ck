const User = require("../models/User");
const NeedAnalysis = require("../models/NeedAnalysis");

const AREA_MAP = {
  careerClarity:       "Career Development",
  communicationSkills: "Communication Skills",
  technicalSkills:     "Technical Skills",
  interviewReadiness:  "Interview Preparation",
  softSkills:          "Soft Skills",
  resumeStrength:      "Resume Building",
};

const getWeakAreas = (ratings = {}) =>
  Object.entries(ratings).filter(([,v]) => v <= 3).map(([k]) => AREA_MAP[k] || k);

const calculateMatchScore = (mentor, na) => {
  let score = 0; const details = {};
  // Language (25pts)
  const ml = (na.preferredLanguage||[]).map(l=>l.toLowerCase());
  const ment = (mentor.languagesKnown||[]).map(l=>l.toLowerCase());
  const common = ment.filter(l=>ml.includes(l));
  const langScore = common.length > 0 ? 25 : 0;
  score += langScore; details.language = { score: langScore, common };
  // Domain (40pts)
  const weak = getWeakAreas(na.ratings || {});
  const exp  = (mentor.expertise||[]).map(e=>e.toLowerCase());
  const matched = weak.filter(a => exp.some(e => e.includes(a.toLowerCase()) || a.toLowerCase().includes(e)));
  const domainScore = weak.length > 0 ? Math.round((matched.length/weak.length)*40) : 20;
  score += domainScore; details.domain = { score: domainScore, matched, weak };
  // Workload (25pts)
  const load = (mentor.assignedMentees||[]).length;
  const loadScore = load===0 ? 25 : load<2 ? 18 : load<3 ? 10 : 0;
  score += loadScore; details.workload = { score: loadScore, current: load };
  // Cybage experience (10pts)
  const exp2 = Number(mentor.yearsAtCybage)||0;
  const expScore = Math.min(exp2*2, 10);
  score += expScore; details.experience = { score: expScore, years: exp2 };
  return { total: Math.round(score), details };
};

const autoMatchAll = async () => {
  const results = [];
  const unmatched = await User.find({ role:"mentee", isMatched:false, needAnalysisCompleted:true });
  const mentors   = await User.find({ role:"mentor", isActive:true });
  for (const mentee of unmatched) {
    const na = await NeedAnalysis.findOne({ mentee: mentee._id });
    if (!na) continue;
    let best = null, bestScore = -1;
    for (const m of mentors) {
      if ((m.assignedMentees||[]).length >= 3) continue;
      const { total } = calculateMatchScore(m, na);
      if (total > bestScore) { bestScore = total; best = m; }
    }
    if (best) {
      await User.findByIdAndUpdate(mentee._id, { assignedMentor: best._id, isMatched: true });
      await User.findByIdAndUpdate(best._id, { $addToSet: { assignedMentees: mentee._id } });
      results.push({ mentee:{id:mentee._id,name:mentee.name}, mentor:{id:best._id,name:best.name}, score:bestScore });
    }
  }
  return results;
};

const getSuggestions = async (menteeId) => {
  const na = await NeedAnalysis.findOne({ mentee: menteeId });
  if (!na) return [];
  const mentors = await User.find({ role:"mentor", isActive:true });
  return mentors.map(m => {
    const { total, details } = calculateMatchScore(m, na);
    return { mentor:{_id:m._id,name:m.name,email:m.email,department:m.department,expertise:m.expertise,languagesKnown:m.languagesKnown,yearsAtCybage:m.yearsAtCybage,currentMentees:(m.assignedMentees||[]).length}, score:total, details };
  }).sort((a,b)=>b.score-a.score).slice(0,5);
};

module.exports = { autoMatchAll, getSuggestions, calculateMatchScore };
