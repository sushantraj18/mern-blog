const bcrypt = require("bcrypt")
const userModel = require("../models/userModel")

const registerUser = async (req,res)=>{
    const {username,email,password} = req.body

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        return res.status(400).json({success : false , message : "All fields are required"})
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
        res.status(500).json({success : false,message : e.message})
    }
}

module.exports = {registerUser}