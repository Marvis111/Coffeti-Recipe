const courses = require('../models/course');
const user = require('../models/user');
const bcrypt = require('bcrypt');
//express validator..

const {check,validationResult,sanitizeBody}  = require('express-validator');
var loginErr = [];


const userData = (body) =>{
    //has password...
    return {
        username:body.username,
        email:body.email,
        password:body.password
    };
}

const userController = {
    indexView: (req,res,next) =>{
        res.render('users/index');
        next();
    },
    courseView : (req,res,next) =>{
        courses.find({}).exec().then((courses)=>{
            res.render('courses/index',{courses:courses});
            next();
        }).catch(err =>{
            console.log(err);
            next(err);
        })
    },
    userSignUp:(req,res,next) =>{
        if(req.session.username){
            res.locals.redirect = `show/${req.session.userId}`;
            next();
        }else{
        res.render('users/new');
        }
    }
    ,
    checkInput:[
        sanitizeBody("email").normalizeEmail({
            all_lowercase:true
        }).trim(),
        check("username","Username is required ").notEmpty(),
        check("email","Email is invalid").isEmail(),
        check('password',"Password is required").notEmpty()
    ],
    validateNewUser:(req,res,next)=>{
        if(req.session.username){
            res.render("users/show",{username:req.session.username});
            req.flash('success',req.session.username+" Logged in Successfully");
        }else{
                req.skip = false;
       //
       //validations..
      const errors = validationResult(req);
      if(errors.errors){
          let errorsObj = errors.errors;
          if(errorsObj.length){
            req.skip = true;
            res.locals.redirect = '/users/new';
            req.flash('error',errorsObj);
            next();
          }else{
            req.skip = false;
            next();
        };
      }
     
        }
        
    
    },
    CreatenewUser:(req,res,next)=>{
        if(req.skip){
            next();
        }else{
            user.find({email:req.body.email}).exec().then((existingUser)=>{
               if(existingUser.length){
                res.locals.redirect = '/users/new';
                req.flash('error',[{
                    msg:"Email already exist"
                }]);
                next();
               }else{
                const userParams = userData(req.body);
                user.create(userParams).then((user)=>{
                    req.session.username = user.username;
                    req.session.useremail = user.email;
                    req.session.userId = user._id;
                    req.flash('success',req.session.username+" Logged in Successfully");
                    res.locals.redirect = `show/${user._id}`;
                    next();
    
                }).catch((error)=>{
                    if(error) throw error;
                    next(error);
                });
               }

            }).catch((error)=>{
                next(error);       
            });
        }
    }
    ,
    
    userLogin : (req,res,next)=>{
        if(req.session.username && req.session.userId){
            req.flash('success',req.session.username+" Logged in Successfully");
            res.redirect('show/'+req.session.userId);
            next();
        }else{
        res.render('users/login');
        next();
        }
    },

    redirectView: (req,res) =>{
        let redirectView = res.locals.redirect;
        if(redirectView){
            res.redirect(redirectView);
        }
    },
    //show..
    show : (req,res,next)=>{
        if(req.session.username){
            userId = req.params.userId;
            user.findById(userId).exec().then((user)=>{
                req.flash('success',req.session.username+" Logged in Successfully");
               
                res.render("users/show",{username:req.session.username,
                    useremail:user.email,userPassword:user.password});
                next();
            }).catch((error)=>{
                next(error);
            })


        }else{
            res.redirect('/users/login');
            next();
        }
    },
    //login from userlogin...
    checkLoginInput:[
        sanitizeBody("email").normalizeEmail({
            all_lowercase:true
        }).trim(),
        check('email',"Email is required").notEmpty(),
        check('email','Invalid Email Address').isEmail(),
        check('password',"Password is required").notEmpty()
    ],
    validateLoginInput:(req,res,next)=>{
        if(req.session.username){
            res.render("users/show",{username:req.session.username});
            req.flash('success',req.session.username+" Logged in Successfully");
        }else{
                req.skip = false;
       //
       //validations..
      const errors = validationResult(req);
      if(errors.errors){
          let errorsObj = errors.errors;
          if(errorsObj.length){
            req.skip = true;
            res.locals.redirect = '/users/login';
            req.flash('error',errorsObj);
            next();
          }else{
            req.skip = false;
            next();
        };
      }
     
        }
        
    },
    checkUser:(req,res,next)=>{
        if(req.skip){
            next();
        }else{
            user.findOne({email:req.body.email}).exec()
            .then((data)=>{
                if(data !== null){
                    if (data.password == req.body.password) {
                        req.session.username = data.username;
                        req.session.useremail = data.email;
                        req.session.userId = data._id;
                        req.flash('success',req.session.username+" Logged in Successfully");
                        res.locals.redirect = `show/${data._id}`;
                        next();
                    }else{
                        res.locals.redirect = '/users/login';
                        req.flash('error',[{
                            msg:"Wrong Email/Password Combination"
                        }]);
                        next();
                    }
                }else{
                    res.locals.redirect = '/users/login';
                    req.flash('error',[{
                        msg:"Wrong Email/Password Combination"
                    }]);
                    next();
                }
              
            }).catch((error)=>{
                console.log(error);
                next(error);
            })
        }

    }
}

module.exports = userController;