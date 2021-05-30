const express = require('express'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
expressSession = require('express-session'),
connectFlash = require('connect-flash');


//required modules..7

//
const app = express();
//use..
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.urlencoded({extended:false}));

//app.use(expressValidator());

app.use(cookieParser('secret_password'));

app.use(expressSession({
    secret:"secret_passcode",
    cookie:{
        maxAge:400000000
    },
    resave:false,
    saveUninitialized:false
}));



app.use(connectFlash());
//use the flash message...

app.use((req,res,next)=>{
    res.locals.flashMessages = req.flash();
    next();
})

//enduse
//set..
app.set('view engine','ejs');
app.set('port',process.env.PORT || 3000);
//endset


//routers
const router = require('./routes/router');
router(app);
//endrouters




app.listen(app.get('port'),()=>{
    console.log('server running on Port '+ app.get('port'));
})




