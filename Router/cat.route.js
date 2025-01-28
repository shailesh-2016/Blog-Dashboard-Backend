const router=require("express").Router()
const Category=require("../Controller/cat.controller")

router.post("/add_cat",Category.cat)