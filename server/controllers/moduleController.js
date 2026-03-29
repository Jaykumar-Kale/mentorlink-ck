const Module = require("../models/Module");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name:process.env.CLOUDINARY_CLOUD_NAME, api_key:process.env.CLOUDINARY_API_KEY, api_secret:process.env.CLOUDINARY_API_SECRET });

exports.getAll = async (req, res) => {
  try { const m = await Module.find({ isActive:true }).sort({ order:1 }); res.json({ success:true, modules:m }); }
  catch(err){ res.status(500).json({ message:err.message }); }
};
exports.getOne = async (req, res) => {
  try { const m = await Module.findById(req.params.id); if (!m) return res.status(404).json({ message:"Not found" }); res.json({ success:true, module:m }); }
  catch(err){ res.status(500).json({ message:err.message }); }
};
exports.create = async (req, res) => {
  try { const m = await Module.create(req.body); res.status(201).json({ success:true, module:m }); }
  catch(err){ res.status(500).json({ message:err.message }); }
};
exports.update = async (req, res) => {
  try { const m = await Module.findByIdAndUpdate(req.params.id, req.body, { new:true }); res.json({ success:true, module:m }); }
  catch(err){ res.status(500).json({ message:err.message }); }
};
exports.upload = async (req, res) => {
  try {
    if (!req.files?.file) return res.status(400).json({ message:"No file" });
    const file = req.files.file;
    const ext  = file.name.split(".").pop().toLowerCase();
    const isImg = ["jpg","jpeg","png","gif"].includes(ext);
    const result = await cloudinary.uploader.upload(file.tempFilePath, { resource_type:isImg?"image":"raw", folder:"mentorlink_cybage/modules", public_id:`${Date.now()}_${file.name.replace(/\s+/g,"_")}` });
    const m = await Module.findById(req.params.id);
    if (!m) return res.status(404).json({ message:"Module not found" });
    m.resources.push({ fileName:file.name, fileUrl:result.secure_url, fileType:ext });
    await m.save();
    res.json({ success:true, module:m });
  } catch(err){ res.status(500).json({ message:err.message }); }
};
exports.deleteResource = async (req, res) => {
  try { await Module.findByIdAndUpdate(req.params.id, { $pull:{ resources:{ _id:req.params.rid } } }); res.json({ success:true }); }
  catch(err){ res.status(500).json({ message:err.message }); }
};
