const router = require('express').Router();
const BlogController = require('../Controller/blog.controller');
const upload=require("../middleware/upload")

router.post('/addBlog',upload.single("post"), BlogController.store);
router.get('/delete/:id', BlogController.trash)
router.post("/updateBlog/:id",upload.single("post"),BlogController.update)
module.exports = router;
