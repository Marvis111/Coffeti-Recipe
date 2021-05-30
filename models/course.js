const { mongo } = require('mongoose');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/confettiDb',{useNewUrlParser:true});
const db = mongoose.connection;
db.once('open',()=>{
    console.log('Successfull connected to Confetti Db');
})


const courseSchema = mongoose.Schema({
    courseTitle:{
        type:String,
        required:true,
        trim:true
    },
    cost:{
        type:Number,
        required:true,
        trim:true
    }
})

const courses = mongoose.model('courses',courseSchema);

module.exports = courses;