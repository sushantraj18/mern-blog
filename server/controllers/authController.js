const bcrypt = require("bcrypt")
const userModel = require("../models/userModel")
const error = require("../middleware/error")
const jwt = require('jsonwebtoken')

const registerUser = async (req,res,next)=>{
    const {username,email,password} = req.body

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        return next(error(400,"All fields are required"))
    }

    
    
    try{
        
        const isUserAlreadyExists  = await userModel.findOne({$or : [{username},{email}]})
        
        if(isUserAlreadyExists){
            return next(error(409,"user already exists"))
        }
        const hasPassword = bcrypt.hashSync(password,12)
        


        const newUser = new userModel({
            username,
            email,
            password:hasPassword,
        })
    
        await newUser.save()
        res.status(201).json({success : true , message : "User created successfully"})

    }catch(e){
        next(e)
    }
}


const loginUser = async(req,res,next)=>{

    const {username,password} = req.body

    if(!username || !password || username === '' || password === ''){
        return next(error(400,"All fields are required"))
    }



    try{

        const isUserAvailable = await userModel.findOne({username})

        if(!isUserAvailable){
            return next(error(400,"invalid user or password"))
        }

        const checkPass = bcrypt.compareSync(password,isUserAvailable.password)

        if(!checkPass){
            return next(error(400,"invalid password or user"))
        }


        const accessToken = jwt.sign({user : isUserAvailable.username},process.env.JWT_TOKEN_KEY,{expiresIn:"1d"})

        res.status(200).cookie('access-token',accessToken,{httpOnly:true}).json("login successfully")

    }catch(e){
        console.log(e)
        next(e)
    }
}


module.exports = {registerUser,loginUser}