const express=require('express')
const cookieParser=require('cookie-parser')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User =require('./model/user')

const app=express()
app.use(express.urlencoded({extended:true}))
const PORT=5090;

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(cookieParser())
app.get('/front',(req,res)=>{
  res.render('front')
})
app.get('/',(req,res)=>{
  res.render('index')
})
app.post('/create',(req,res)=>{
  let {name,password,email,age}=req.body;

  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,async(err,hash)=>{
let ceatee=await User.create({
  name,
  password:hash
  ,email,age

})


let token=jwt.sign({email},"errrrrr");
res.cookie('token',token)
res.redirect('/')

    })
  })
})
app.get('/logout',(req,res)=>{
  res.cookie('token'," ")
  res.redirect('/')
})
app.get('/login',(req,res)=>{
res.render('login')
})
app.post('/login',async(req,res)=>{
  let {email,password}=req.body;
let userr=await User.findOne({email})
if(!userr) return res.send('some thing is wrong !....')
  
 bcrypt.compare(password,userr.password,(err,result)=>{
  
console.log(result)
 })

  })
app.listen(PORT,(req,res)=>{
    console.log('sucessful')
})