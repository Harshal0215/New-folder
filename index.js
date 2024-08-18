const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')
const path = require('path')
const bcrypt = require('bcrypt')
const userModel = require('./models/user.js')
const jwt = require('jsonwebtoken')

app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser());


app.get('/',(req,res)=>{
    res.render("index2")
})

app.post('/create', async (req,res)=>{
    let {username,password,email,age} = req.body;

    bcrypt.genSalt(10,async (error,salt)=>{
    bcrypt.hash(password,salt,async(err,hash)=>{
        let userCreated = await userModel.create({
            username,
            password:hash,
            email,
            age,
        });
        let token = jwt.sign({ foo: 'bar' }, 'shhhhh');
        res.cookie('token',token)
        res.send(userCreated)
    })      
})

});

app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/login',async(req,res)=>{
    let user = await userModel.findOne({email:req.body.email})
    if(!user) return res.send('something went wrong')
        

        bcrypt.compare(req.body.password, user.password, (err,result)=>{
            
        if(result){res.send(`<h1>welcome ${user.username}</h1>`)}
        else{res.send('Something went wrong')}
        })
})

app.get("/logout",(req,res)=>{
    res.cookie('token',"")
    res.redirect('/')
})
 
app.listen(3000);