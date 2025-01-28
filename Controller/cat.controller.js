const Category=require("../Model/cat.model")

exports.cat=async(req,res)=>{
    try {
        const {cat_name}=req.body
        const existcat=await Category.findOne({cat_name}).countDocuments().exec()
        if(existcat){
            res.json({
                success:true,
                message:"already exist"
            })
        }else{
            await Category.create({cat_name})
            // res.redirect("/view_cat")
            res.json({
                success:true,
                message:"category added"
            })
        }
    } catch (error) {
        console.log(error)
    }
}