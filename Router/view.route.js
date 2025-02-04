const router = require("express").Router();
const Admin = require("../Model/admin.model");
const blogModel=require('../Model/blog.model');
const { matchLogin } = require("../utils/loginMiddleware");


router.get("/",(req,res)=>{
  matchLogin(req,res,"Pages/index")
})
router.get("/addBlog",(req,res)=>{
  matchLogin(req,res,"Pages/addBlog")
})
router.get("/addBlog", (req, res) => {
  res.render("Pages/addBlog"); 
});
router.get("/viewBlog",async(req,res)=>{
  const blog=await blogModel.find()
  res.render('Pages/viewBlog',{blog})
})
router.get("/updateBlog", async (req, res) => {
  const { id } = req.query;
  const blog = await blogModel.findById(id);
  res.render("Pages/updateBlog", { blog });
});
router.get("/register", (req, res) => {
  res.render("Pages/register");
});
router.get("/login",(req,res)=>{
  res.render("Pages/login")
})

// router.get("/",(req,res)=>{
//   console.log(req.cookies)
//   res.render("Pages/index")
// })


router.get("/myProfile",async (req, res) => {
  // const admin = req.cookies.admin;
  // res.render("pages/myProfile", { admin });

  const cookieData=req.cookies.admin
  const email=cookieData.email
  const singleAdmin=await Admin.findOne({email})
  res.render('Pages/myProfile',{admin:singleAdmin})
});

router.get("/logout",(req,res)=>{
  res.clearCookie("admin")
  res.redirect("/login")
})

router.get("/changePassword",async(req,res)=>{
  const email=await req.cookies.admin.email
  res.render("Pages/changePassword",{email})
})

router.get("/updatePass", (req, res) => {
  res.render("Pages/forgotPass");
});
// router.get("/add_cat",async(req,res)=>{
//   res.render("Pages/addCat")
// })
// router.get("/view_cat",async(req,res)=>{
//   res.render("Pages/viewCat")
// })
module.exports = router;
