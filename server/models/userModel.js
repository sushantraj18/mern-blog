const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique  : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required  : true
    },
    profile : {
        type : String,
        default : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
    }
},{timestamps: true});

module.exports = mongoose.model("User",userSchema);