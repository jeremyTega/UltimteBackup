const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstName:{type:String, require:true},
    lastName:{type:String, require:true},
    email:{type:String, require:true, unique:true},
    password:{type:String, require:true},
    balance: { type: Number, default: 0 },
    earnings: { type: Number, default: 0 },
    isAdmin:{type:Boolean, default:false}
},
{timestamps:true})

const userModel = mongoose.model("user", userSchema)
module.exports = userModel