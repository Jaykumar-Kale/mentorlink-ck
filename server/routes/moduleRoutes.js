const r=require("express").Router();
const {getAll,getOne,create,update,upload,deleteResource}=require("../controllers/moduleController");
const {protect,authorize}=require("../middleware/auth");
r.get("/",protect,getAll); r.get("/:id",protect,getOne);
r.post("/",protect,authorize("admin"),create);
r.put("/:id",protect,authorize("admin"),update);
r.post("/:id/upload",protect,authorize("admin"),upload);
r.delete("/:id/resource/:rid",protect,authorize("admin"),deleteResource);
module.exports=r;
