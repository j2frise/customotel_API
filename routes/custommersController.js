//imports
var bcrypt = require('bcryptjs');
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');
var asyncLib = require('async');
const { Op } = require("sequelize");
var twilio = require('../send/twilio');

//Routes
module.exports = {
    searchCustomer: function(req, res) {
        if(!req.data.userId){
            return res.status(503).json({'status':503, 'response': 'Veuillez vous connecter avec votre mail et le mot de passe correspondant à cet espace hôtelier'});
        }

        var query   = req.body.query;

        models.Customers.findAll({
            order: [['fullname', 'ASC']],
            where: {
                [Op.or]: [
                    { fullname: query },
                    { pseudo: query },
                    { uniqid: query.toLocaleUpperCase() },
                    { email: query },
                    { phone: query }
                ],
                [Op.and]: [{
                    deletedAt: {
                        [Op.eq]: null
                      }
                }]
            },
            include: [
                {
                    model: models.Rates,
                    include: [
                        { 
                            model: models.User_hostels,
                            attributes: ["id", "is_admin", "role", "createdAt"],
                            include: [{ model: models.Users }]
                        }
                    ]
                }
            ]
          }).then(function(customers) {
            if (customers.length) {
                res.status(200).json({"status":200, "data":customers});
            } else {
                res.status(404).json({ "status": 404, "response": "Aucune correspondance trouvée" });
            }
          }).catch(function(err) {
            res.status(500).json({"status": 500, "response": err+" => Erreur, veuillez réessayer plutard" });
        });
    },

    getClient: function(req, res) {
        if(!req.data.userId){
            return res.status(503).json({'status':503, 'response': 'Veuillez vous connecter avec votre mail et le mot de passe correspondant à cet espace hôtelier'});
        }

        var id   =  parseInt(req.params.id);

        models.Customers.findOne({
            where: {id: id},
            include: [
                {
                    model: models.Rates,
                    include: [
                        { 
                            model: models.User_hostels,
                            attributes: ["id", "is_admin", "role", "createdAt"],
                            include: [{ model: models.Users },{ model: models.Hostels }]
                        }
                    ]
                }
            ]
          }).then(function(customer) {
            if (customer) {
                if(!customer.deletedAt){
                    res.status(200).json({"status":200, "data":customer});
                } else {
                    res.status(403).json({ "status": 403, "response": "Cet utilisateur a été supprimé" });
                }
            } else {
                res.status(404).json({ "status": 404, "response": "Aucune correspondance trouvée" });
            }
          }).catch(function(err) {
            res.status(500).json({"status": 500, "response": "Erreur, veuillez réessayer plutard" });
        });
    },

    loginInSpace: function(req, res){
        //get params
    
        var password = req.body.password;
        var email = req.body.email;
    
        asyncLib.waterfall([
            function(done) {
              //verify hostel exist
              models.Users.findOne({
                where: {email: email, deletedAt: { [Op.eq]: null } }
              })
              .then(function(userFound) {
                done(null, userFound);
              })
              .catch(function(err) {
                return res.status(500).json({'status':500, 'response': 'impossible de vérifier l\'espace utilisateur, Veuillez réessayer plus tard'});
              });
            },
            function(userFound, done) {
                //verify hostel exist
                if(userFound){
                    models.User_hostels.findOne({
                        where: {userId: userFound.id, hostelId: req.data.hostelId, deletedAt: { [Op.eq]: null } }
                    })
                    .then(function(found) {
                        done(null, found);
                    })
                    .catch(function(err) {
                        return res.status(500).json({'status':500, 'response': err+' => impossible de vérifier l\'espace utilisateur, Veuillez réessayer plus tard'});
                    });
                } else {
                    return res.status(404).json({'status':404, 'response': 'Cet utilisateur n\'existe pas'});
                }
              },
            function(found, done) {
              if (found) {
                bcrypt.compare(password, found.password, function(errBycrypt, resBycrypt) {
                  done(null, found, resBycrypt);
                });
              } else {
                return res.status(404).json({'status':404, 'response': 'Ce compte n\'est pas lié à cet hotel'});
              }
            },
            function(found, resBycrypt, done) {
              if(resBycrypt) {
                done(found);
              } else {
                return res.status(403).json({'status':403, 'response': 'Mot de passe incorrect'});
              }
            }
          ], function(found) {
              
            if (found) {
              return res.status(201).json({
                'status':201,
                'data': {
                  'token': jwtUtils.generateTokenForHostel(found.hostelId, req.data.apiKey, found.userId)
                }
              });
            } else {
                return res.status(500).json({'status':500, 'response': 'Erreur, Veuillez réessayer plus tard'});
            }
        });
    },

    createClient: function(req, res){
        if(!req.data.userId){
            return res.status(503).json({'status':503, 'response': 'Veuillez vous connecter avec votre mail et le mot de passe correspondant à cet espace hôtelier'});
        }

        var fullname = req.body.fullname;
        var pseudo = req.body.pseudo?req.body.pseudo:null;
        var avatar = '/assets/img/default.png';
        var desc = req.body.desc?req.body.desc:null;
        var sexe = req.body.sexe;
        var phone = req.body.phone;
        var email = req.body.email?req.body.email:null;

        var whereUser = {phone: phone, deletedAt: { [Op.eq]: null } }
        if(email){
            whereUser.email = email;
        }

        function generateHexString(length) {
            var ret = "";
            while (ret.length < length) {
              ret += Math.random().toString(16).substring(2);
            }
            return ret.substring(0,length);
        }

        asyncLib.waterfall([
            function(done){
                models.User_hostels.findOne({
                    where: {userId : req.data.userId, hostelId: req.data.hostelId, deletedAt: { [Op.eq]: null } }
                })
                .then(function(found) {
                    done(null, found);
                })
                .catch(function(err) {
                    return res.status(500).json({'status':500, 'response': 'impossible de vérifier l\'utilisateur, Veuillez réessayer plus tard'});
                });
            },
            function(found, done) {
              //verify hostel exist
              if(found){
                models.Customers.findOne({
                    where: whereUser
                  })
                  .then(function(customerFound) {
                    done(null, customerFound,found);
                  })
                  .catch(function(err) {
                    return res.status(500).json({'status':500, 'response': 'impossible de vérifier l\'hotel, Veuillez réessayer plus tard'});
                  });
              } else {
                return res.status(503).json({'status':503, 'response': 'Vous n\'êtes pas autorisé à utiliser l\'API'});
              }
              
            },
            function(customerFound, found, done) {
                //verify hostel exist
                if(!customerFound){
                    models.Customers.create({
                        userHostelId: found.id,
                        fullname: fullname,
                        pseudo: pseudo,
                        avatar: avatar,
                        desc: desc,
                        sexe: sexe,
                        uniqid: generateHexString(8).toLocaleUpperCase(),
                        phone: phone,
                        email: email
                    })
                    .then(function(newCustomer){
                        done(newCustomer);
                    })
                    .catch(function(err){
                        return res.status(500).json({'status':500, 'response': 'opération échouée'});
                    });
                } 
                else {
                    return res.status(409).json({'status':409, 'response': 'Ce client existe déjà avec ce numéro de téléphone ou ce mail'});
                }
            }
          ], function(newCustomer) {
            if (newCustomer) {
                twilio.sendToClient(newCustomer.phone, `Votre compte a été créé dans le service Customotel, voici votre identifiant client : ${newCustomer.uniqid}`);
                return res.status(201).json({'status':201, 'data': newCustomer });
            } else {
                return res.status(500).json({'status':500, 'response': 'Erreur, Veuillez réessayer plus tard'});
            }
        });
    },

    giveFeedback: function(req, res){
        if(!req.data.userId){
            return res.status(503).json({'status':503, 'response': 'Veuillez vous connecter avec votre mail et le mot de passe correspondant à cet espace hôtelier'});
        }

        var clientId = parseInt(req.body.clientId);
        var rating = parseInt(req.body.rating);
        var comment = req.body.comment?req.body.comment:null;

        asyncLib.waterfall([
            function(done){
                models.User_hostels.findOne({
                    include:[{model: models.Hostels, required: true}],
                    where: {userId : req.data.userId, hostelId: req.data.hostelId, deletedAt: { [Op.eq]: null } }
                })
                .then(function(found) {
                    done(null, found);
                })
                .catch(function(err) {
                    return res.status(500).json({'status':500, 'response': 'impossible de vérifier l\'utilisateur, Veuillez réessayer plus tard'});
                });
            },
            function(found, done) {
              //verify hostel exist
              if(found){
                models.Rates.create({
                    userHostelId: found.id,
                    customerId: clientId,
                    rating: rating,
                    comment: comment
                })
                .then(function(newRate){
                    done(null, newRate, found);
                })
                .catch(function(err){
                    return res.status(500).json({'status':500, 'response': 'opération échouée'});
                });
              } else {
                return res.status(503).json({'status':503, 'response': 'Vous n\'êtes pas autorisé à utiliser l\'API'});
              }
              
            },
            function(newRate, found, done){
                models.Customers.findOne({
                    where: {id : newRate.customerId }
                })
                .then(function(customer) {
                    done(newRate, customer, found);
                })
                .catch(function(err) {
                    return res.status(500).json({'status':500, 'response': 'Erreur lors de la récupération du client'});
                });
            }
          ], function(newRate, customer, found) {
            if (newRate) {
                var calc  = Number(newRate.rating)/2;
                var note = calc > 1 ? calc+' étoiles': calc+' étoile'
                twilio.sendToClient(customer.phone, `Vous avez reçu une nouvelle notation de la part de l'hotel ${found.Hostel.name}. Votre note globale est maintenant de ${note}/5`);
                return res.status(201).json({'status':201, 'response': 'Votre notation a été pris en compte' });
            } else {
                return res.status(500).json({'status':500, 'response': 'Erreur, Veuillez réessayer plus tard'});
            }
        });
    }
}