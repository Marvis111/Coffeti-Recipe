const userController = require('../controllers/userController');
const subscriberController = require('../controllers/subscribersController');

const {check,validationResult,sanitizeBody}  = require('express-validator');
const router = (app) =>{
    //all get routes...
    app.get('/',userController.indexView);
    
    //users..
    app.get('/users/login',userController.userLogin);
    app.get('/users/new',userController.userSignUp,userController.redirectView);
    app.get('/users/show/:userId',userController.show);
    

    app.post('/users/new',userController.checkInput,userController.validateNewUser,userController.CreatenewUser,userController.redirectView);

    app.post('/users/login',userController.checkLoginInput,userController.validateLoginInput,userController.checkUser,userController.redirectView);
  
    //courses...
    
    //subscribers
    app.get('/subscribers/index',subscriberController.indexView);
    app.get("/subscribers/new",subscriberController.newIndex);
    app.post('/subscribers/new', subscriberController.validate,subscriberController.redirectView);
        //all post routes...



}

module.exports = router;