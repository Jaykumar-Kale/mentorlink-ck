const r=require("express").Router();
const {submit,getMyForm,getByMentee}=require("../controllers/needAnalysisController");
const {protect,authorize}=require("../middleware/auth");
r.post("/",protect,authorize("mentee"),submit);
r.get("/me",protect,getMyForm);
r.get("/:menteeId",protect,authorize("admin","mentor"),getByMentee);
module.exports=r;
