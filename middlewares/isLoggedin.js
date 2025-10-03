module.exports = async (req,res,next)=>{
    if(!req.cookies.token){
        req.flash("error","you need to login first")
        return res.redirect("/")
    }
    try {
        let decoded = jwt.verify(token, 'shhhhh');
        let user = await userModel.findOne({email:decoded.email}).select("-password")
        req.user = user
        next()
    } catch (err) {
        req.flash("error","something went wrong")
        res.redirect("/")
    }
}