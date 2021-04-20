var express = require('express');

var usersCtrl = require('../routes/usersController');
var commonCtrl = require('../routes/commonController');

//Router
exports.router = (function(){
    var simpeRouter = express.Router();
    
    //Users routes
    simpeRouter.route('/users/register/').post(usersCtrl.registerUser);
    simpeRouter.route('/users/login/').post(usersCtrl.login);
    simpeRouter.route('/users/activate/').put(usersCtrl.activateAccount);

    //Common routes
    simpeRouter.route('/list/subscription/').get(commonCtrl.subscriptionList);

    //subscriptions
    simpeRouter.route('/close/subscription/').put(commonCtrl.expiredTheSubscribe);

    return simpeRouter
})();