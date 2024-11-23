
const jwt=require('jsonwebtoken')
const enssureAuthenticated=(req,res,next)=>{
    const auth=req.headers['authorization'];
    if(!auth){
        return res.status(403)
        .json({message:'Unauthorzed,JWt is token required'});
    }
    try{
        const decode=jwt.verify(auth,process.env.JWT_SECRET);
        req.user=decode
        next();
    }
    catch(err){
        return res.status(403)
        .json({message:'unotorized,JWT token is wrong or expired'});
    }

}
module.exports=enssureAuthenticated