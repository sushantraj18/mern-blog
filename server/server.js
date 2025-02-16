const express = require("express")
require("dotenv").config()
const dbConnect  = require("./database/dbConnect")

const app = express()

// dbConnection
dbConnect()

app.listen(3000,(req,res)=>{
    console.log(`server running at http://localhost:3000`)
})