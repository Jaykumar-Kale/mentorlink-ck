const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role:     { type: String, enum: ["admin","mentor","mentee","alumni","volunteer"], required: true },
  phone:    String,
  gender:   { type: String, enum: ["Male","Female","Other"] },
  profilePhoto: { type: String, default: "" },
  employeeId:   String,         // Cybage employee ID for mentors
  department:   String,         // Cybage department
  designation:  String,
  yearsAtCybage: Number,
  languagesKnown: [String],
  expertise: [String],
  linkedIn:  String,
  college:   String,
  year:      String,
  stream:    String,
  scholarshipId: String,
  city:      String,
  assignedMentor:  { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  assignedMentees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  isMatched: { type: Boolean, default: false },
  isActive:  { type: Boolean, default: true },
  needAnalysisCompleted: { type: Boolean, default: false },
  passwordResetToken: String,
  passwordResetExpire: Date,
}, { timestamps: true });

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.methods.matchPassword = async function(p) { return bcrypt.compare(p, this.password); };
module.exports = mongoose.model("User", userSchema);
