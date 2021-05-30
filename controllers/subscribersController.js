const subscriber = require('../models/subscriber').subscriber;
const subscriberData = (body) =>{
    return {
        name:body.name,
        Email:body.email,
        zipCode:body.zipCode

    };
}


const subscriberController = {
indexView: (req,res,next)=>{
        res.render('subscribers/index');
        next();
    },
    newIndex:(req,res,next)=>{
        res.render('subscribers/new');
        next();
    },

 validate: (req,res,next) =>{
     /*
     req.check('name',"Name is reqired").notEmpty();
    req.sanitizeBody('email').normalizeEmail({
        all_lowercase:true
    }).trim();

    req.getValidationResult().then((error)=>{
        if(!error.isEmpty()){
            console.log(error);
            next();
    
        }
    })
*/  
let newSubscriberData = subscriberData(req.body);
subscriber.create(newSubscriberData).then((user)=>{
    req.flash('success',`${user.name} account created successfully` );
    res.locals.redirect = "/subscribers/new";
    res.locals.user = user;
    next();
}).catch((error)=>{
    if(error){
        res.locals.redirect = '/susbscribers/new';
        req.flash('error',
        'Failed to create user account because of '+error.message);

        next(error);
    }
})
},
    redirectView:(req,res,next) =>{
        let redirectView = res.locals.redirect;
        if(redirectView){
            res.redirect(redirectView);
            next();
        }
    },
newSubscriber:(req,res,next) =>{

}

}


module.exports = subscriberController;