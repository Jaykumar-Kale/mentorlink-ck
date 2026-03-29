const User = require("../models/User");
const jwt  = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const genToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE||"7d" });

const mail = async ({ to, subject, html }) => {
  const t = nodemailer.createTransport({ host: process.env.EMAIL_HOST, port: Number(process.env.EMAIL_PORT)||587, secure:false, auth:{ user:process.env.EMAIL_USER, pass:process.env.EMAIL_PASS } });
  await t.sendMail({ from: process.env.EMAIL_FROM, to, subject, html });
};

exports.register = async (req, res) => {
  try {
    const { name,email,password,role,phone,gender,employeeId,department,designation,yearsAtCybage,languagesKnown,expertise,linkedIn,college,year,stream,scholarshipId,city } = req.body;
    if (await User.findOne({ email })) return res.status(400).json({ message:"Email already registered" });
    const user = await User.create({
      name,email,password,role:role||"mentee",phone,gender,employeeId,department,designation,
      yearsAtCybage:yearsAtCybage?Number(yearsAtCybage):undefined,
      languagesKnown: Array.isArray(languagesKnown)?languagesKnown:(languagesKnown||"").split(",").map(l=>l.trim()).filter(Boolean),
      expertise: Array.isArray(expertise)?expertise:(expertise||"").split(",").map(e=>e.trim()).filter(Boolean),
      linkedIn,college,year,stream,scholarshipId,city,
    });
    try {
      await mail({ to:email, subject:"Welcome to CybageKhushboo MentorLink", html:`<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto"><div style="background:#0066CC;padding:28px;text-align:center"><h1 style="color:white;margin:0;font-size:22px">Welcome to MentorLink</h1><p style="color:#B3D4F5;margin:4px 0 0;font-size:13px">CybageKhushboo Charitable Trust</p></div><div style="padding:28px;background:#F8FAFF"><p>Hi <strong>${name}</strong>,</p><p>Your MentorLink account has been created successfully.</p><p><strong>Role:</strong> ${role}</p><a href="${process.env.CLIENT_URL}/login" style="display:inline-block;background:#FF6B00;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;margin-top:12px">Login to MentorLink</a></div></div>` });
    } catch(e){ console.log("Email failed:",e.message); }
    res.status(201).json({ success:true, token:genToken(user._id), user:{ _id:user._id,name:user.name,email:user.email,role:user.role,profilePhoto:user.profilePhoto } });
  } catch(err){ res.status(500).json({ message:err.message }); }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user||!(await user.matchPassword(password))) return res.status(401).json({ message:"Invalid email or password" });
    if (!user.isActive) return res.status(403).json({ message:"Account deactivated. Contact admin." });
    res.json({ success:true, token:genToken(user._id), user:{ _id:user._id,name:user.name,email:user.email,role:user.role,profilePhoto:user.profilePhoto,isMatched:user.isMatched,needAnalysisCompleted:user.needAnalysisCompleted,assignedMentor:user.assignedMentor,assignedMentees:user.assignedMentees } });
  } catch(err){ res.status(500).json({ message:err.message }); }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password")
      .populate("assignedMentor","name email profilePhoto department designation phone languagesKnown expertise")
      .populate("assignedMentees","name email profilePhoto college year stream");
    res.json({ success:true, user });
  } catch(err){ res.status(500).json({ message:err.message }); }
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email:req.body.email });
    if (!user) return res.status(404).json({ message:"No account with that email" });
    const token = crypto.randomBytes(20).toString("hex");
    user.passwordResetToken  = crypto.createHash("sha256").update(token).digest("hex");
    user.passwordResetExpire = Date.now() + 10*60*1000;
    await user.save({ validateBeforeSave:false });
    await mail({ to:user.email, subject:"CybageKhushboo MentorLink – Password Reset", html:`<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto"><div style="background:#0066CC;padding:20px;text-align:center"><h2 style="color:white;margin:0">Password Reset</h2></div><div style="padding:24px"><p>Click below to reset your password (expires in 10 minutes):</p><a href="${process.env.CLIENT_URL}/reset-password/${token}" style="display:inline-block;background:#FF6B00;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold">Reset Password</a></div></div>` });
    res.json({ success:true, message:"Reset email sent" });
  } catch(err){ res.status(500).json({ message:err.message }); }
};

exports.resetPassword = async (req, res) => {
  try {
    const hashed = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user   = await User.findOne({ passwordResetToken:hashed, passwordResetExpire:{ $gt:Date.now() } });
    if (!user) return res.status(400).json({ message:"Invalid or expired token" });
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save();
    res.json({ success:true, message:"Password reset successful" });
  } catch(err){ res.status(500).json({ message:err.message }); }
};

exports.updateProfile = async (req, res) => {
  try {
    const fields = ["name","phone","department","designation","languagesKnown","expertise","college","year","stream","linkedIn","city"];
    const update = {};
    fields.forEach(f => { if (req.body[f]!==undefined) update[f]=req.body[f]; });
    const user = await User.findByIdAndUpdate(req.user._id, update, { new:true }).select("-password");
    res.json({ success:true, user });
  } catch(err){ res.status(500).json({ message:err.message }); }
};
