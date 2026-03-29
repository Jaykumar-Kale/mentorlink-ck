const mongoose = require("mongoose");
const sessionSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mentee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  topic: {
    type: String,
    enum: ["Introduction Call","Career Development","Communication Skills",
           "Interview Preparation","Technical Skills","Soft Skills",
           "Resume Building","Higher Education Guidance","Other"],
    required: true,
  },
  date:        { type: Date, required: true },
  startTime:   { type: String, required: true },
  endTime:     String,
  duration:    String,
  meetingLink: String,
  agenda:      String,
  status:      { type: String, enum: ["upcoming","completed","cancelled"], default: "upcoming" },
  summary:     String,
  mentorFeedback: String,
  menteeFeedback: String,
  menteeRating:   { type: Number, min: 1, max: 5 },
  createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
module.exports = mongoose.model("Session", sessionSchema);
