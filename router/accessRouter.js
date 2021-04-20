//imports
var express = require('express');
var hostelCtrl = require('../routes/hostelsController');

//Router
exports.router = (function(){
    var accessRouter = express.Router();
    
    //Hostels routes
    accessRouter.route('/connect').post(hostelCtrl.loginInSpace);
    accessRouter.route('/create/hostel').post(hostelCtrl.createHostel);

    //user
    accessRouter.route('/users/create').post(hostelCtrl.createUserAccount);
    accessRouter.route('/forgot').post(hostelCtrl.forgot);
    accessRouter.route('/users/list').get(hostelCtrl.userList);
    accessRouter.route('/users/update').put(hostelCtrl.updateUser);

    //memeberships
    accessRouter.route('/subscribe').post(hostelCtrl.subscriptionHotel);
    accessRouter.route('/subscribe/history').get(hostelCtrl.subscribeList);
    accessRouter.route('/subscribe/current').get(hostelCtrl.subscribeCurrent);

    return accessRouter
})();