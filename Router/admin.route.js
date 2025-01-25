const router=require("express").Router()
const Admin=require("../Controller/admin.controller")
const upload = require("../middleware/upload")

router.post("/register",Admin.register)
router.post("/login",Admin.login)
router.post("/updateProfile",upload.single("admin_profile") , Admin.updateProfile)
router.post("/changePassword",Admin.changePass)
module.exports=router