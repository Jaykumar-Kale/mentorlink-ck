const r=require("express").Router();
const {register,login,getMe,forgotPassword,resetPassword,updateProfile}=require("../controllers/authController");
const {protect}=require("../middleware/auth");
r.post("/register",register); r.post("/login",login); r.get("/me",protect,getMe);
r.post("/forgot-password",forgotPassword); r.put("/reset-password/:token",resetPassword);
r.put("/update-profile",protect,updateProfile);
module.exports=r;
