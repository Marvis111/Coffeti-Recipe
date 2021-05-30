const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/confettiDb",{useNewUrlParser:true});


const db = mongoose.connection;
db.once("open",()=>{
    console.log('connected');
})

 const subscriberSchema = mongoose.Schema({
     name:{
         type:String,
         required:true,
         trim:true
     },
     Email:{
         type:String,
         required:true,
         unique:true
     },
     zipCode:{
        type:String,
        required:true,
        trim:true
    }
 });

 const subscriber = mongoose.model('subscriber',subscriberSchema);

 module.exports = {
     subscriber, db };