//imports
var express = require('express');
var clientCtrl = require('../routes/custommersController');

//Router
exports.router = (function(){
    var customerRouter = express.Router();
    
    //Hostels routes
    customerRouter.route('/search').get(clientCtrl.searchCustomer);

    //Users routes
    customerRouter.route('/login').post(clientCtrl.loginInSpace);

    //client
    customerRouter.route('/create').post(clientCtrl.createClient);
    customerRouter.route('/give/feedback').post(clientCtrl.giveFeedback);
    customerRouter.route('/get/:id').get(clientCtrl.getClient);

    return customerRouter
})();