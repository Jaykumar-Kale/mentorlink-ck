const NeedAnalysis = require("../models/NeedAnalysis");
const User = require("../models/User");

exports.submit = async (req, res) => {
  try {
    if (await NeedAnalysis.findOne({ mentee:req.user._id }))
      return res.status(400).json({ message:"Already submitted" });
    const form = await NeedAnalysis.create({ mentee:req.user._id, ...req.body });
    await User.findByIdAndUpdate(req.user._id, { needAnalysisCompleted:true });
    res.status(201).json({ success:true, form });
  } catch(err){ res.status(500).json({ message:err.message }); }
};
exports.getMyForm = async (req, res) => {
  try {
    const form = await NeedAnalysis.findOne({ mentee:req.user._id });
    if (!form) return res.status(404).json({ message:"Not submitted", submitted:false });
    res.json({ success:true, form, submitted:true });
  } catch(err){ res.status(500).json({ message:err.message }); }
};
exports.getByMentee = async (req, res) => {
  try {
    const form = await NeedAnalysis.findOne({ mentee:req.params.menteeId }).populate("mentee","name email college year");
    if (!form) return res.status(404).json({ message:"Not found" });
    res.json({ success:true, form });
  } catch(err){ res.status(500).json({ message:err.message }); }
};
