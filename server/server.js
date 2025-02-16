const express = require("express")
require("dotenv").config()
const dbConnect  = require("./database/dbConnect")
const authRoute = require("./routes/authRoute.js")

const app = express()

app.use(express.json())

// dbConnection
dbConnect()


app.use("/api/auth",authRoute)

app.listen(3000,()=>{
    console.log(`server running at http://localhost:3000`)
})