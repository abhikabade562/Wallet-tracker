const express =require('express')
const cors =require('cors')
const mprgan =require('morgan')
const dotenv =require('dotenv')
const colors =require('colors')
const path = require('path')
const morgan = require('morgan')
const connectDb = require('./config/connectDB')

//config dot env file
dotenv.config();

//Database call
connectDb();
//adding rest objects
const app =express()

//Adding middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//routes
//user routes
app.use("/api/v1/users",require("./routes/userRoute"));

//trnasection routes
app.use("/api/v1/transections",require("./routes/transectionRoutes"));

//Static files
app.use(express.static(path.join(__dirname,'./client/build')));
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
});

//port
const PORT =8080 || process.env.PORT;

//Listen server
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
});