exports.matchLogin=(req,res,path,extra)=>{
    const cookieData=req?.cookies?.admin
    console.log(cookieData)
    if(!cookieData){
        res.redirect('/login')
    }else{
        res.render(path,extra)
    }
    }