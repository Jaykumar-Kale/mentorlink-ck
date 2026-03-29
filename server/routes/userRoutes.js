const r=require("express").Router();
const User=require("../models/User");
const {protect}=require("../middleware/auth");
r.get("/mentors",protect,async(req,res)=>{
  try{const m=await User.find({role:"mentor",isActive:true}).select("name email department designation yearsAtCybage languagesKnown expertise profilePhoto phone");res.json({success:true,mentors:m});}catch(e){res.status(500).json({message:e.message})}
});
r.get("/mentor/:id",protect,async(req,res)=>{
  try{const u=await User.findById(req.params.id).select("-password");if(!u)return res.status(404).json({message:"Not found"});res.json({success:true,user:u});}catch(e){res.status(500).json({message:e.message})}
});
module.exports=r;
