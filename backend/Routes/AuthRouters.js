const { signup, login} = require('../Controllers/AuthController');
const { signupValidation, loginupValidation } = require('../Middlewares/AuthValidation');

const router=require('express').Router();
console.log("routers")
router.get("/test",(req,res)=>{
    res.send("testing");
})
router.post("/login",loginupValidation,login);

router.post("/signup",signupValidation,signup)

// router.post("/verify-otp", verifyOtp); // OTP Verification
// router.post("/resend-otp", resendOtp);
module.exports=router;