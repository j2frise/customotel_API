//imports
var express = require('express');
var bodyParser = require('body-parser');
var accessRouter = require('./router/accessRouter').router;
var customerRouter = require('./router/customerRouter').router;
var simpleRouter = require('./router/simpleRouter').router;
var jwtUtils = require('./utils/jwt.utils');
var html = require('./send/html');
var moment = require('moment');  

const PORT = process.env.PORT || 5000

var models = require('./models');
var asyncLib = require('async');
const { Op } = require("sequelize");

var cors = require('cors');

//instantiate server
var server = express();

server.use(cors({ origin: '*'}));

server.use(express.static(__dirname + '/data'));

//Body parser configuration
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

//configure routes
server.get('/',function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html.home())
});

var verifAccessDashoard =  function(req, res, next){
    var headerAuth  = req.headers['authorization'];
    var user = jwtUtils.getUserHostel(headerAuth);
    if(!user){
        return res.status(500).json({'status':503, 'response': 'accès interdit ou incorrect'});
    }
    req.user = user;
    next();
}

var verifAccessAPI =  function(req, res, next){
    var headerAuth  = req.headers['authorization'];
    var apiKey  = req.headers['api-key'];
    var data = jwtUtils.getHostel(apiKey, headerAuth);

    if(!data){
        return res.status(500).json({'status':503, 'response': 'accès interdit ou incorrect'});
    } else {
        models.Memberships.findOne({
            include : [{model: models.Subscriptions, required: true}],
            where: {hostelId: data.hostelId, is_expired: 0},
            order: [['createdAt', 'DESC']]
        }).then(function(current) {
            if (current) {
                req.data = data;
                next();
            } else {
                res.status(503).json({ "status": 503, "response": "Veuillez renouveller votre abonnement" });
            }
        }).catch(function(err) {
            res.status(500).json({"status": 500, "response": "Erreur, veuillez réessayer plutard" });
        });
    } 
}

server.use('/', simpleRouter);
server.use('/access', [verifAccessDashoard, accessRouter]);
server.use('/client', [verifAccessAPI, customerRouter]);

//Launch server
server.listen(PORT, function(){
    console.log("serveur customotel en marche? COOL :)");
});
