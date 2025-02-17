const express = require("express")
require("dotenv").config()
const dbConnect  = require("./database/dbConnect")
const authRoute = require("./routes/authRoute.js")

const app = express()

app.use(express.json())

// dbConnection
dbConnect()


app.use("/api/auth",authRoute)



app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const errMessage = err.message || 'Something went wrong';
    res.status(statusCode).json({success : false,statusCode,errMessage})
})

app.listen(3000,()=>{
    console.log(`server running at http://localhost:3000`)
})