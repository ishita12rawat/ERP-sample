require("dotenv").config();
const mongoose = require('mongoose');
const {MONGO_URI}  = require('../env');

const userschema=mongoose.Schema({
    name:String,
    password:String,
    email:String,
    age:Number
})
mongoose.connect(MONGO_URI)
const User=mongoose.model('user',userschema)
module.exports= User