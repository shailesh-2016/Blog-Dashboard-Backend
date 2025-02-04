const router=require("express").Router()
const Admin=require("../Controller/admin.controller")
const upload = require("../middleware/upload");
const passport = require("passport");

router.post("/register",Admin.register)
// router.post("/login", (req, res, next) => {
//     Passport.authenticate("local", (err, user, info) => {
//       if (err) {
//         return next(err);
//       }
//       if (!user) {
//         return res.redirect("/login");
//       }
//       req.logIn(user, (err) => {
//         if (err) {
//           return next(err); 
//         }
//         return res.redirect("/"); 
//       });
//     })(req, res, next);
//   });
router.post("/login",passport.authenticate('local',{failureRedirect:'/login',successRedirect:'/'}))

  router.post("/updateProfile",upload.single("admin_profile") , Admin.updateProfile)
router.post("/changePassword",Admin.changePass)
router.post("/forgot-pass",Admin.forgotPass)
router.post("/updatePass",Admin.updatePass)
// router.post("")
module.exports=router