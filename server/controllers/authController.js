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
        const {password : pass ,...rest}= isUserAvailable._doc

        res.status(200).cookie('access-token',accessToken,{httpOnly:true}).json({rest})

    }catch(e){
        console.log(e)
        next(e)
    }
}

const google = async(req,res,next)=>{
    const {name,email,googlePhotoUrl} = req.body
    try{
        const user = await userModel.findOne({$or : [{email } , {username : name}]});
        if(user){
            const accessToken = jwt.sign({user : user.username},process.env.JWT_TOKEN_KEY);
            const {password,...rest} = user._doc;
            res.status(200).cookie('access-token',accessToken,{httpOnly : true}).json(rest)
        }else{
            
            const genratePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashPassword = bcrypt.hashSync(genratePassword,10)

            const newUser = new userModel({
                username : name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
                email,
                password : hashPassword,
                profile : googlePhotoUrl
            })

            await newUser.save()

            const accessToken = jwt.sign({user : newUser.username},process.env.JWT_TOKEN_KEY);
            const {password,...rest} = newUser._doc
            res.status(200).cookie('access-token',accessToken,{httpOnly:true}).json(rest)
        }


    }catch(e){

    }
}


module.exports = {registerUser,loginUser,google}