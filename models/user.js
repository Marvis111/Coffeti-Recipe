const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/confettiDb",{useNewUrlParser:true});


const db = mongoose.connection;
db.once("open",()=>{
    console.log('connected');
})

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        unique:true,
        trim:true,
        type:String
    },
    password:{
        trim:true,
        type:String
    }
});



const user = mongoose.model('users',userSchema);

userSchema.pre('save',function(next){
    let User = this;
    bcrypt.hash(User.password,10).then(hash=>{
        User.password = hash;
        console.log('hashed');
        next();
    }).catch(error=>{
        console.log(error.message);
        next(error);
    })
});

module.exports = user;