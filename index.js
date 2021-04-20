//imports
var express = require('express');
var bodyParser = require('body-parser');
var accessRouter = require('./router/accessRouter').router;
var simpleRouter = require('./router/simpleRouter').router;
var jwtUtils = require('./utils/jwt.utils');
var moment = require('moment');  

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
    res.status(200).send('<h1>serveur Node de customotel</h1>')
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

server.use('/', simpleRouter);
server.use('/access', [verifAccessDashoard, accessRouter]);

//Launch server
server.listen(3300, function(){
    console.log("serveur customotel en marche :)");
});
