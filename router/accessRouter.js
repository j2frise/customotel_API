//imports
var express = require('express');
var hostelCtrl = require('../routes/hostelsController');

//Router
exports.router = (function(){
    var accessRouter = express.Router();
    
    //Hostels routes
    accessRouter.route('/connect').post(hostelCtrl.loginInSpace);
    accessRouter.route('/create/hostel').post(hostelCtrl.createHostel);
    accessRouter.route('/token').get(hostelCtrl.generateToken);

    //user
    accessRouter.route('/users/create').post(hostelCtrl.createUserAccount);
    accessRouter.route('/forgot').post(hostelCtrl.forgot);
    accessRouter.route('/users/list').get(hostelCtrl.userList);
    accessRouter.route('/users/update').put(hostelCtrl.updateUser);
    accessRouter.route('/isconnect').get(hostelCtrl.isConnect);

    //memeberships
    accessRouter.route('/subscribe').post(hostelCtrl.subscriptionHotel);
    accessRouter.route('/subscribe/history').get(hostelCtrl.subscribeList);
    accessRouter.route('/subscribe/current').get(hostelCtrl.subscribeCurrent);

    //rate
    accessRouter.route('/client/list').get(hostelCtrl.clientList);
    accessRouter.route('/client/mylist').get(hostelCtrl.clientMyList);
    accessRouter.route('/rate/list').get(hostelCtrl.rateList);
    accessRouter.route('/rate/mylist').get(hostelCtrl.rateMyList);

    return accessRouter
})();