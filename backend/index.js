require('dotenv').config();

const express=require('express');
const app=express();
const bodyParser=require("body-parser");
const cors=require("cors");
const AuthRouter=require('./Routes/AuthRouters')
const ProductRouter=require('./Middlewares/Auth')
const chatbotRoutes = require('./Routes/chatbootR');
require("./Modals/db");
app.get('/ping',(req,res)=>{
    res.send("sever on");
})
// app.use(express.json());
app.use(bodyParser.json())
app.use(cors())//i am ready to take request from any server you can specify port ip here in form of array
app.use('/api',AuthRouter);
app.use('/products',ProductRouter);
const PORT=process.env.PORT||8080;

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body); // Log incoming requests
    next();
});

app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
});
app.use('/chatbot', chatbotRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});