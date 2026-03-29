const User = require("../models/User");
const Session = require("../models/Session");
const NeedAnalysis = require("../models/NeedAnalysis");
const { autoMatchAll, getSuggestions } = require("../utils/matching");

exports.getStats = async (req, res) => {
  try {
    const [mentors,mentees,sessions,matched,needDone,completed] = await Promise.all([
      User.countDocuments({ role:"mentor" }), User.countDocuments({ role:"mentee" }),
      Session.countDocuments(), User.countDocuments({ role:"mentee",isMatched:true }),
      User.countDocuments({ role:"mentee",needAnalysisCompleted:true }), Session.countDocuments({ status:"completed" }),
    ]);
    res.json({ success:true, stats:{ mentors, mentees, sessions, matched, unmatched:mentees-matched, needDone, completed } });
  } catch(err){ res.status(500).json({ message:err.message }); }
};
exports.getUsers = async (req, res) => {
  try {
    const { role, isMatched, search, page=1, limit=20 } = req.query;
    const q = {};
    if (role) q.role=role;
    if (isMatched!==undefined) q.isMatched=isMatched==="true";
    if (search) q.$or=[{ name:{ $regex:search,$options:"i" } },{ email:{ $regex:search,$options:"i" } }];
    const total = await User.countDocuments(q);
    const users = await User.find(q).select("-password").populate("assignedMentor","name email").populate("assignedMentees","name email").limit(Number(limit)).skip((page-1)*limit).sort({ createdAt:-1 });
    res.json({ success:true, users, total, pages:Math.ceil(total/limit) });
  } catch(err){ res.status(500).json({ message:err.message }); }
};
exports.createUser = async (req, res) => {
  try {
    if (await User.findOne({ email:req.body.email })) return res.status(400).json({ message:"Email exists" });
    const user = await User.create(req.body);
    res.status(201).json({ success:true, user });
  } catch(err){ res.status(500).json({ message:err.message }); }
};
exports.updateUser = async (req, res) => {
  try {
    if (req.body.password) delete req.body.password;
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new:true }).select("-password");
    res.json({ success:true, user });
  } catch(err){ res.status(500).json({ message:err.message }); }
};
exports.deleteUser = async (req, res) => {
  try { await User.findByIdAndDelete(req.params.id); res.json({ success:true }); }
  catch(err){ res.status(500).json({ message:err.message }); }
};
exports.autoMatch = async (req, res) => {
  try { const r = await autoMatchAll(); res.json({ success:true, message:`Matched ${r.length} mentee(s)`, results:r }); }
  catch(err){ res.status(500).json({ message:err.message }); }
};
exports.getMatchSuggestions = async (req, res) => {
  try { const s = await getSuggestions(req.params.menteeId); res.json({ success:true, suggestions:s }); }
  catch(err){ res.status(500).json({ message:err.message }); }
};
exports.manualMatch = async (req, res) => {
  try {
    const { menteeId, mentorId } = req.body;
    const [mentee,mentor] = await Promise.all([User.findById(menteeId),User.findById(mentorId)]);
    if (!mentee||!mentor) return res.status(404).json({ message:"User not found" });
    if (mentee.assignedMentor) await User.findByIdAndUpdate(mentee.assignedMentor, { $pull:{ assignedMentees:menteeId } });
    await User.findByIdAndUpdate(menteeId, { assignedMentor:mentorId, isMatched:true });
    await User.findByIdAndUpdate(mentorId, { $addToSet:{ assignedMentees:menteeId } });
    res.json({ success:true, message:`${mentee.name} matched with ${mentor.name}` });
  } catch(err){ res.status(500).json({ message:err.message }); }
};
exports.getAllSessions = async (req, res) => {
  try { const s = await Session.find().populate("mentor","name email").populate("mentee","name email").sort({ date:-1 }); res.json({ success:true, sessions:s }); }
  catch(err){ res.status(500).json({ message:err.message }); }
};
exports.getAllNA = async (req, res) => {
  try { const f = await NeedAnalysis.find().populate("mentee","name email college year").sort({ createdAt:-1 }); res.json({ success:true, forms:f }); }
  catch(err){ res.status(500).json({ message:err.message }); }
};
