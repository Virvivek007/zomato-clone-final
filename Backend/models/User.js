const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    user:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true}
})

module.exports = mongoose.model('User',UserSchema)