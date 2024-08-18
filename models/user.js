const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/LoginApp');

const userSchema = mongoose.Schema({
    username:String,
    password:String,
    age:Number,
    email:String,
})

const user = mongoose.model('user1',userSchema);
module.exports = user;