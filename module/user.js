const { default: mongoose } = require("mongoose");

let usersSchema=new mongoose.Schema({
    email:String,
    password:String,
    name:String

})
let Users=mongoose.model('user',usersSchema)



module.exports= {Users}