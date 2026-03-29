const r=require("express").Router();
const {createSession,getMySessions,getStats,updateStatus,updateSession,deleteSession}=require("../controllers/sessionController");
const {protect}=require("../middleware/auth");
r.use(protect);
r.post("/",createSession); r.get("/",getMySessions); r.get("/stats",getStats);
r.put("/:id/status",updateStatus); r.put("/:id",updateSession); r.delete("/:id",deleteSession);
module.exports=r;
