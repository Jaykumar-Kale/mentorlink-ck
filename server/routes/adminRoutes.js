const r=require("express").Router();
const {getStats,getUsers,createUser,updateUser,deleteUser,autoMatch,getMatchSuggestions,manualMatch,getAllSessions,getAllNA}=require("../controllers/adminController");
const {protect,authorize}=require("../middleware/auth");
r.use(protect,authorize("admin"));
r.get("/stats",getStats); r.get("/users",getUsers); r.post("/users",createUser);
r.put("/users/:id",updateUser); r.delete("/users/:id",deleteUser);
r.post("/auto-match",autoMatch); r.get("/match-suggestions/:menteeId",getMatchSuggestions);
r.post("/manual-match",manualMatch); r.get("/sessions",getAllSessions); r.get("/need-analysis",getAllNA);
module.exports=r;
