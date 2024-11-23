// signup and login routes
require('dotenv').config();
const bcrypt = require('bcrypt');
const UserModel = require("../Modals/User");
const jwt = require('jsonwebtoken');
const { sendMail } = require('../Helpers/sendMail');

const signup = async (req, res) => {
  try {
     const { name, email, password } = req.body;
    // const name=req.body;
    // const email=req.body
    // const password=req.body
    const user = await UserModel.findOne({ email });
    
    if (user) {
      return res.status(409)
        .json({ message: 'User already exists, you can log in.', success: false });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    
    await sendMail(email, "Welcome to our Coffee Project", `Hi ${name}, thank you for registering!`);
    
    res.status(201).json({
      message: "Signup successful!",
      success: true
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    
    if (!user) {
      return res.status(403).json({ message: 'Auth failed, email or password is wrong', success: false });
    }
    
    const isPassEqual = await bcrypt.compare(password, user.password);
    
    if (!isPassEqual) {
      return res.status(403).json({ message: 'Auth failed, email or password is wrong', success: false });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(200).json({
      message: "Login successful!",
      success: true,
      jwtToken,
      email,
      name: user.name
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

module.exports = {
  signup,
  login
};