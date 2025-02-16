const mongoose = require("mongoose")

const MONGO = process.env.MONGO

const dbConnect  = async()=>{
    try{

        const connect = await mongoose.connect(MONGO)

        if(!connect){
            console.log("mongoDB connection fail")
        }

        console.log("mongoDB connected successfully")
    }catch(e){
        console.log(e)
    }
}

module.exports = dbConnect