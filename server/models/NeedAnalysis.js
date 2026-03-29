const mongoose = require("mongoose");
const needAnalysisSchema = new mongoose.Schema({
  mentee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  careerGoal:         String,
  biggestChallenge:   String,
  ratings: {
    careerClarity:      { type: Number, min:1, max:5 },
    communicationSkills:{ type: Number, min:1, max:5 },
    technicalSkills:    { type: Number, min:1, max:5 },
    interviewReadiness: { type: Number, min:1, max:5 },
    softSkills:         { type: Number, min:1, max:5 },
    resumeStrength:     { type: Number, min:1, max:5 },
  },
  preferredMode:    String,
  preferredLanguage:[String],
  willingToMeet:    String,
  specificHelp:     String,
  submittedAt:      { type: Date, default: Date.now },
}, { timestamps: true });
module.exports = mongoose.model("NeedAnalysis", needAnalysisSchema);
