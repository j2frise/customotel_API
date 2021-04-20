//imports
var express = require('express');

var usersCtrl = require('./routes/usersController');
var customersCtrl = require('./routes/customersController');
var professionalsCtrl = require('./routes/professionalsController');
var commonCtrl = require('./routes/commonController');
var appointmentCtrl = require('./routes/appointmentController');
var searchCtrl = require('./routes/searchController');
var visitedController = require('./routes/visitedController');
var bondController = require('./routes/bondController');

//Router
exports.router = (function(){
    var apiRouter = express.Router();

    //Users routes
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/get/:user/').get(usersCtrl.getUserProfile);
    apiRouter.route('/users/update/').put(usersCtrl.updateUserProfile);
    apiRouter.route('/users/get-admin/').get(usersCtrl.getAdmin);
    apiRouter.route('/users/update/:id/:status/').get(usersCtrl.updateUser);
    apiRouter.route('/users/activate/:id/').get(usersCtrl.activate);
    apiRouter.route('/users/user-activate/').get(usersCtrl.userIsActivate);

    //Customers routes
    apiRouter.route('/customers/update/info/').put(customersCtrl.updateCustomerInfo); //
    apiRouter.route('/customers/update/avatar/').post(customersCtrl.updateAvatarCustomer);

    //Professionals routes
    apiRouter.route('/professionals/update/info/').put(professionalsCtrl.updateProfessionalInfo); //
    apiRouter.route('/professionals/update/bank/').put(professionalsCtrl.updateProfessionalBank);
    apiRouter.route('/professionals/update/work/').put(professionalsCtrl.updateProfessionalWork);
    apiRouter.route('/professionals/delete/speak/:speakId/').get(professionalsCtrl.removeSpeaks);
    apiRouter.route('/professionals/delete/rung/:rungId/').get(professionalsCtrl.removeRung);
    apiRouter.route('/professionals/add/speak/').put(professionalsCtrl.addSpeaks);
    apiRouter.route('/professionals/add/rung/').put(professionalsCtrl.addRung);
    apiRouter.route('/professionals/get/accept/').get(professionalsCtrl.acceptPayment);
    apiRouter.route('/professionals/add/accept/').put(professionalsCtrl.addAcceptPayment);
    apiRouter.route('/professionals/delete/accept/:acceptId/').get(professionalsCtrl.removeAcceptPayment);
    apiRouter.route('/professionals/update/avatar/').post(professionalsCtrl.updateAvatarProfessional);
    apiRouter.route('/professionals/add/agenda/').post(professionalsCtrl.addAgenda);
    apiRouter.route('/professionals/update/agenda/:agendaId/:status/').get(professionalsCtrl.updateAgenda);
    apiRouter.route('/professionals/get/agenda/').post(professionalsCtrl.myAgenda);
    apiRouter.route('/professionals/get/:id/').get(professionalsCtrl.getProfessional);
    apiRouter.route('/professionals/get/active-agenda/:professionalId/:date').get(professionalsCtrl.getAgendaActive);

     //Common routes
    apiRouter.route('/common/list/language/').get(commonCtrl.languageList);
    apiRouter.route('/common/list/payment/').get(commonCtrl.typePayment);
    apiRouter.route('/common/list/job/').get(commonCtrl.jobList);
    apiRouter.route('/common/list/professional/:status/').get(commonCtrl.professionalList);
    apiRouter.route('/common/list/customer/:status/').get(commonCtrl.customerList);

    //Appointment routes
    apiRouter.route('/appointment/add/').put(appointmentCtrl.addAppointment);
    apiRouter.route('/appointment/update/:appointmentId/:status/').get(appointmentCtrl.updateAppointment);
    apiRouter.route('/appointment/get/customer/').get(appointmentCtrl.customerAppointment);
    apiRouter.route('/appointment/get/professional/').get(appointmentCtrl.professionalAppointment);
    apiRouter.route('/appointment/getLast/customer/:date/').get(appointmentCtrl.customerAppointmentLast);
    apiRouter.route('/appointment/getLast/professional/:date/').get(appointmentCtrl.professionalAppointmentLast);
    apiRouter.route('/appointment/list').get(appointmentCtrl.appointments);
    apiRouter.route('/appointment/create-chanel/').get(appointmentCtrl.nocache, appointmentCtrl.createChanel);

    //Search routes 
    apiRouter.route('/search/professional/').get(searchCtrl.listProfessional);

    //Visited Route
    apiRouter.route('/visited/add/:professionalId/').get(visitedController.addVisited);
    apiRouter.route('/visited/list').get(visitedController.getListVisited);

    //Bond Route
    apiRouter.route('/bond/customer/').get(bondController.getListBondCustomer);
    apiRouter.route('/bond/professional/').get(bondController.getListBondProfessional);


    apiRouter.route('/get/player/').get(commonCtrl.getPlayer)

     

    return apiRouter
})();