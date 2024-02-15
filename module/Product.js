
const { default: mongoose } = require("mongoose");


let userproduct=new mongoose.Schema({
title:String,
    price:Number,
    img:String

})
let Products=mongoose.model('product',userproduct)


module.exports= {Products}