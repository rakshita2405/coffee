const enssureAuthenticated=require('../Middlewares/Auth')
const router=require('express').Router();
router.get("/",enssureAuthenticated,(req,res)=>{
    console.log("---logged user",req.user)
    res.status(200).json([
        {
        name:"mobile",
        price:"20000"
        },
        {
            name:"Tv",
            price:"70000"
        }
    ])
})


module.exports=router;