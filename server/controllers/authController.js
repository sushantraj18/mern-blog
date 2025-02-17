const bcrypt = require("bcrypt")
const userModel = require("../models/userModel")
const error = require("../middleware/error")

const registerUser = async (req,res,next)=>{
    const {username,email,password} = req.body

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        return next(error(400,"All fields are required"))
    }

    const hasPassword = bcrypt.hashSync(password,12)

    const newUser = new userModel({
        username,
        email,
        password:hasPassword,
    })

    try{

        await newUser.save()
        res.status(201).json({success : true , message : "User created successfully"})

    }catch(e){
        next(e)
    }
}

module.exports = {registerUser}