//imports
var bcrypt = require('bcryptjs');
var models = require('../models');
var asyncLib = require('async');
var html = require('../send/html')
const { Op } = require("sequelize");
var jwtUtils = require('../utils/jwt.utils');
var moment = require('moment');

//Routes
module.exports = {
  loginInSpace: function(req, res){
    //get params

    var password = req.body.password;
    var space = req.body.space;

    asyncLib.waterfall([
        function(done) {
          //verify hostel exist
          models.User_hostels.findOne({
            where: {UserId: req.user.userId, HostelId: space, deletedAt: { [Op.eq]: null } }
          })
          .then(function(found) {
            done(null, found);
          })
          .catch(function(err) {
            return res.status(500).json({'status':500, 'response': 'impossible de vérifier l\'espace utilisateur, Veuillez réessayer plus tard'});
          });
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
              'userId': found.UserId,
              'hostelId': found.HostelId,
              'role': found.role,
              'isAdmin': found.is_admin,
              'token': jwtUtils.generateTokenForUser(found.UserId, found.HostelId, found.is_admin)
            }
          });
        } else {
            return res.status(500).json({'status':500, 'response': 'Erreur, Veuillez réessayer plus tard'});
        }
    });
  },

  forgot: function(req, res){
    //get params
    var space = req.body.space;

    asyncLib.waterfall([
        function(done) {
          //verify hostel exist
          models.User_hostels.findOne({
            attributes: ['hostelId', 'userId'],
            include :[{
                    model: models.Users,
                    attributes: ['email'],
                    required: true
                },
                {
                    model: models.Hostels,
                    attributes: ['name','shortname'],
                    required: true
                }
            ],
            where: {HostelId: space, UserId: req.user.userId, deletedAt: { [Op.eq]: null } }
          })
          .then(function(found) {
            done(found);
          })
          .catch(function(err) {
            return res.status(500).json({'status':500, 'response': 'impossible de vérifier l\'hotel, Veuillez réessayer plus tard'});
          });
        }
      ], function(found) {
        if (found) {
            var token = jwtUtils.generateTokenForUser(found.UserId, found.HostelId, found.is_admin);
            html.forgot(found.User.email, found.Hostel.name, found.Hostel.shortname, token)
            return res.status(201).json({'status':201, 'response': 'Un mail vous a été envoyé'});
        } else {
            return res.status(409).json({'status':403, 'response': 'Vous n\'êtes plus affilié à cet hotel'});
        }
    });
  },

  createHostel: function(req, res){
    //get params
    var name = req.body.name;
    var shortname = req.body.shortname;
    var address = req.body.address;
    var role = req.body.role;
    var password = req.body.password;
    var subId = req.body.subId;

    function generateHexString(sh_name, length) {
        var ret = "";
        while (ret.length < length) {
          ret += Math.random().toString(16).substring(2);
        }
        return sh_name+"-"+ret.substring(0,length);
    }

    asyncLib.waterfall([
        function(done){
            models.Users.findOne({
                where: {id: req.user.userId, deletedAt: { [Op.eq]: null } }
            })
            .then(function(userFound) {
                done(null, userFound);
            })
            .catch(function(err) {
                return res.status(500).json({'status':500, 'response': 'impossible de vérifier l\'utilisateur, Veuillez réessayer plus tard'});
            });
        },
        function(userFound, done) {
          //verify hostel exist
          if(userFound){
            models.Hostels.findOne({
                where: {shortname: shortname, address: address, deletedAt: { [Op.eq]: null } }
              })
              .then(function(hostelFound) {
                done(null, hostelFound,userFound);
              })
              .catch(function(err) {
                return res.status(500).json({'status':500, 'response': 'impossible de vérifier l\'hotel, Veuillez réessayer plus tard'});
              });
          } else {
            return res.status(404).json({'status':404, 'response': 'Cet utilisateur n\'existe pas'});
          }
          
        },
        function(hostelFound, userFound, done) {
            //verify hostel exist
            if(!hostelFound){
                models.Hostels.create({
                    name: name,
                    shortname: shortname,
                    logo: '/assets/img/default.png',
                    address: address
                })
                .then(function(newHostel){
                    done(null, newHostel,userFound);
                })
                .catch(function(err){
                    return res.status(500).json({'status':500, 'response': 'opération échouée'});
                });
            } 
            else {
                return res.status(409).json({'status':409, 'response': 'Cet hotel existe déjà'});
            }
        },
        function(newHostel, userFound, done) {
            newHostel.update({app_id: generateHexString(newHostel.shortname, 20)})
            .then(function() {
              done(null, newHostel, userFound);
            }).catch(function(err) {
                return res.status(500).json({'status':500, 'response': 'Erreur lors de la création'});
            });
        },
        function(newHostel, userFound, done) {
            models.Subscriptions.findOne({
                where: {id: subId }
            })
            .then(function(subscription) {
                done(null, newHostel, subscription, userFound);
            })
            .catch(function(err) {
                return res.status(500).json({'status':500, 'response': 'impossible de récupérer la formule d\'abonnement'});
            });
        },
        function(newHostel, subscription, userFound, done) {
            var expired = moment().add(subscription.duration, 'months').format("YYYY-MM-DD HH:mm:ss");            
            models.Memberships.create({
                SubscriptionId: subscription.id,
                HostelId: newHostel.id,
                expired: expired,
                is_expired: false,
                nb_account: 0
            })
            .then(function(member){
                done(null, newHostel, member ,subscription, userFound);
            })
            .catch(function(err){
                return res.status(500).json({'status':500, 'response': 'opération échouée'});
            });
        },
        function(newHostel, member ,subscription, userFound, done) {
            bcrypt.hash(password, 5, function(err, bcryptedPassword){
                models.User_hostels.create({
                    HostelId: newHostel.id,
                    UserId: req.user.userId,
                    is_admin: true,
                    role: role,
                    password: bcryptedPassword        
                })
                .then(function(newSpace){
                    console.log(userFound.email);
                    done(newSpace, member ,subscription, userFound);
                })
                .catch(function(error){
                    return res.status(500).json({'status':500, 'response': 'opération échouée'});
                });
            });
        },
      ], function(newSpace, member ,subscription, userFound) {
        if (newSpace) {
            html.createHostel(name, shortname, userFound.email);
            html.subscriptionHotel(name, shortname, userFound.email, member, subscription);
            html.welcome(userFound.email, name, shortname);
            return res.status(201).json({
                'status':201,
                'data': {
                'userId': newSpace.UserId,
                'hostelId': newSpace.HostelId,
                'role': newSpace.role,
                'isAdmin': newSpace.is_admin,
                'token': jwtUtils.generateTokenForUser(newSpace.UserId, newSpace.HostelId, newSpace.is_admin)
                }
            });
        } else {
            return res.status(500).json({'status':500, 'response': 'Erreur, Veuillez réessayer plus tard'});
        }
    });
  },

  createUserAccount: function(req, res){
    //get params
    if(!req.user.isAdmin){
        return res.status(500).json({'status':503, 'response': 'accès interdit ou incorrect'});
    }
    var email = req.body.email;
    var role = req.body.role;

    function generateHexString(length) {
        var ret = "";
        while (ret.length < length) {
          ret += Math.random().toString(16).substring(2);
        }
        return ret.substring(0,length);
    }

    asyncLib.waterfall([
        
        function(done){
            models.Memberships.findOne({
                where: {HostelId: req.user.hostelId, is_expired: 0}
            })
            .then(function(memberfound){
                done(null, memberfound);
            })
            .catch(function(error){
                console.log(req.user);
                return res.status(500).json({'status':500, 'response': 'Erreur, Veuillez réessayer plus tard'});
            })
        },
        function(memberfound, done){
            models.Subscriptions.findOne({
                where: {id: memberfound.SubscriptionId }
            })
            .then(function(subfound){
                done(null, subfound, memberfound);
            })
            .catch(function(error){
                return res.status(500).json({'status':500, 'response': 'Erreur, Veuillez réessayer plus tard'});
            })
        },
        function(subfound, memberfound, done){
            if(memberfound.nb_account < subfound.nb_account){
                done(null, memberfound);
            }
            else{
                return res.status(500).json({'status':409, 'response': 'Vous avez atteint le nombre maximum de création de compte utilisateur'});
            }
        },
        function(memberfound, done){
            //verify user exist
            models.Users.findOne({
                attributes: ['email','id'],
                where: {email: email}
            })
            .then(function(userFound){
                done(null, userFound, memberfound);
            })
            .catch(function(error){
                return res.status(500).json({'status':500, 'response': 'Erreur, Veuillez réessayer plus tard'});
            })
        },
        function(userFound, memberfound, done){
            var is_new = true; 
            if(!userFound){
              models.Users.create({
                  email: email,
                  isActived: false
              })
              .then(function(newUser){
                  done(null, is_new, newUser, memberfound, userFound);
              })
              .catch(function(err){
                  return res.status(500).json({'status':500, 'response': 'opération échouée'});
              });
            } else {
                is_new = false;
                models.User_hostels.findOne({
                    where: {UserId: userFound.id, HostelId: req.user.hostelId, deletedAt: { [Op.eq]: null }}
                })
                .then(function(found){
                    done(null, is_new, found, memberfound, userFound);
                })
                .catch(function(error){
                    return res.status(500).json({'status':500, 'response': 'Erreur, Veuillez réessayer plus tard'});
                })
            }
        },
        function(is_new, found, memberfound, userFound, done) {
            //verify hostel exist
            if(is_new || (!found && !is_new)){
                var password = generateHexString(7)
                bcrypt.hash(password, 5, function(err, bcryptedPassword){
                    models.User_hostels.create({
                        UserId: userFound.id,
                        HostelId: req.user.hostelId,
                        role: role,
                        password: bcryptedPassword,
                        is_admin: false
                    })
                    .then(function(newSpace){
                        done(null,newSpace, is_new, memberfound);
                    })
                    .catch(function(error){
                        return res.status(500).json({'status':500, 'response': 'opération échouée'});
                    });
                });
            } 
            else {
                return res.status(409).json({'status':409, 'response': 'Cet email est déjà utilisé par cet hotel'});
            }
        },
        function(newSpace, is_new, memberfound, done){
            memberfound.update({nb_account: (Number(memberfound.nb_account) + 1)})
            .then(function() {
              done(null, newSpace, is_new);
            }).catch(function(err) {
                return res.status(500).json({'status':500, 'response': 'Erreur lors de la création'});
            });
        },
        function(newSpace, is_new, done){
            models.User_hostels.findOne({
                attributes: ['hostelId', 'userId','role', 'is_admin', 'deletedAt', 'createdAt'],
                include :[{model: models.Users,required: true},{model: models.Hostels,required: true}],
                where: {id: newSpace.id, deletedAt: { [Op.eq]: null } }
            })
            .then(function(the_space) {
                done(the_space,is_new);
            })
            .catch(function(err) {
                return res.status(500).json({'status':500, 'response': 'impossible de vérifier l\'hotel, Veuillez réessayer plus tard'});
            });
        }
      ], function(the_space,is_new) {
        if (the_space) {
            if(is_new){
                var token = jwtUtils.generateTokenForUser(the_space.UserId, the_space.HostelId, the_space.is_admin);
                html.register(email, token);
            }
            html.welcome(email,the_space.Hostel.name, the_space.Hostel.shortname);
            return res.status(201).json({'status':201, 'response': "L'utilisateur a été ajouté dans l'espace. Un email lui a été envoyé"});
        } else {
            return res.status(500).json({'status':500, 'response': 'Erreur, Veuillez réessayer plus tard'});
        }
    });
  },

  subscriptionHotel:function(req, res){
    if(!req.user.isAdmin){
        return res.status(500).json({'status':503, 'response': 'accès interdit ou incorrect'});
    }

    var subId = req.body.subId;

    asyncLib.waterfall([
        function(done) {
          //verify hostel exist
          models.Memberships.findOne({
            include : [{model: models.Hostels, required: true}],
            where: {HostelId: req.user.hostelId},
            order: [['createdAt', 'DESC']]
            
          })
          .then(function(memberfound) {
            done(null, memberfound);
          })
          .catch(function(err) {
            return res.status(500).json({'status':500, 'response': 'impossible de vérifier l\'espace utilisateur, Veuillez réessayer plus tard'});
          });
        },
        function(memberfound, done) {
          if (memberfound.is_expired) {
            models.Subscriptions.findOne({
                where: {id: subId }
            })
            .then(function(subscription) {
                done(null, subscription,memberfound);
            })
            .catch(function(err) {
                return res.status(500).json({'status':500, 'response': 'impossible de récupérer la formule d\'abonnement'});
            });
          } else {
            return res.status(404).json({'status':409, 'response': 'Vous avez déjà un abonnement en cours'});
          }
        },
        function(subscription, memberfound, done) {
            var expired = moment().add(subscription.duration, 'months').format("YYYY-MM-DD HH:mm:ss");            
            models.Memberships.create({
                SubscriptionId: subscription.id,
                HostelId: req.user.hostelId,
                expired: expired,
                is_expired: false,
                nb_account: memberfound.nb_account
            })
            .then(function(newMember){
                done(null,newMember, subscription,memberfound);
            })
            .catch(function(err){
                return res.status(500).json({'status':500, 'response': 'opération échouée'});
            });
        },
        function(newMember, subscription,memberfound, done){
            models.Users.findOne({
                where: {id: req.user.userId }
            })
            .then(function(userFound) {
                done(newMember, subscription, userFound, memberfound);
            })
            .catch(function(err) {
                return res.status(500).json({'status':500, 'response': err+' => impossible de récupérer la formule d\'abonnement'});
            });
        }
      ], function(newMember, subscription, userFound, memberfound) {
        if (newMember) {
            var diff = Number(subscription.nb_account) - Number(newMember.nb_account);
            var message = "";
            var positive_diff = diff < 0 ? diff*(-1) : diff;
            var compte = positive_diff > 1?'comptes utilisateurs':'compte utilisateur';

            if(diff < 0){
                message = `Pour votre nouvelle formule d'abonnement, il vous faut obligatoirement supprimer ${positive_diff} ${compte}`;
                
            } else {
                message = `Il vous reste au total ${positive_diff} ${compte} pouvant être créer`;
            }
            html.subscriptionHotel(memberfound.Hostel.name, memberfound.Hostel.shortname, userFound.email, newMember, subscription)
            html.deletedAccount(userFound.email, memberfound.Hostel.name, memberfound.Hostel.shortname, message)
            
            return res.status(201).json({
                'status':201,
                'data': {
                'account_status': diff,
                'response': `Votre nouvel abonnement <strong>${subscription.name}</strong> a été pris avec succès<br>${message}`
                }
            });
        } else {
            return res.status(500).json({'status':500, 'response': 'Erreur, Veuillez réessayer plus tard'});
        }
    });
  },

  subscribeList:function(req, res){
    if(!req.user.isAdmin){
        return res.status(500).json({'status':503, 'response': 'accès interdit ou incorrect'});
    }

    models.Memberships.findAll({
        include : [{model: models.Subscriptions, required: true}],
        where: {HostelId: req.user.hostelId},
        order: [['createdAt', 'DESC']]
    }).then(function(list) {
        if (list) {
            res.status(200).json({"status":200, "data":list});
        } else {
            res.status(404).json({ "status": 404, "response": "Aucune donnée trouvée" });
        }
    }).catch(function(err) {
        res.status(500).json({"status": 500, "response": "Erreur, veuillez réessayer plutard" });
    });
  },

  subscribeCurrent:function(req, res){
    if(!req.user.isAdmin){
        return res.status(500).json({'status':503, 'response': 'accès interdit ou incorrect'});
    }

    models.Memberships.findOne({
        include : [{model: models.Subscriptions, required: true}],
        where: {HostelId: req.user.hostelId, is_expired: 0},
        order: [['createdAt', 'DESC']]
    }).then(function(current) {
        if (current) {
            res.status(200).json({"status":200, "data":current});
        } else {
            res.status(404).json({ "status": 404, "response": "Aucune donnée trouvée" });
        }
    }).catch(function(err) {
        res.status(500).json({"status": 500, "response": "Erreur, veuillez réessayer plutard" });
    });
  },

  userList: function(req, res){
    models.User_hostels.findAll({
        attributes: ["id", "is_admin", "role", "createdAt"],
        include : [{model: models.Users}],
        where: {
          HostelId: req.user.hostelId,
          deletedAt: {
            [Op.eq]: null
          }
        }
      }).then(function(list) {
        if (list) {
          res.status(200).json({"status":200, "data":list});
        } else {
          res.status(404).json({ "status": 404, "response": "Aucune donnée trouvée" });
        }
      }).catch(function(err) {
        res.status(500).json({"status": 500, "response": "Erreur, veuillez réessayer plutard" });
      });
  },

  updateUser: function(req, res){
    var userAttributes = {};
    var userProfileAttributes = {};
    var id = req.body.id;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var status = req.body.status;
    var password = req.body.password;
    var role = req.body.role;

    if(firstname){userProfileAttributes.firstname = firstname}
    if(lastname){userProfileAttributes.lastname = lastname}
    if(status){userAttributes.status = status}
    if(password){userAttributes.password = password}
    if(role){userAttributes.role = role}

    asyncLib.waterfall([
        function(done) {
          //verify hostel exist
          models.User_hostels.findOne({
            where: {UserId: id, HostelId: req.user.hostelId}
          })
          .then(function(found) {
            done(null, found);
          })
          .catch(function(err) {
            return res.status(500).json({'status':500, 'response': 'impossible de vérifier l\'espace utilisateur, Veuillez réessayer plus tard'});
          });
        },
        function(found, done) {
          if(status || password || role){
            found.update(userAttributes)
            .then(function() {
              done(null, found);
            }).catch(function(err) {
                return res.status(500).json({'status':500, 'response': 'Erreur lors de la modifification'});
            });
          } else {
              done(null, found)
          }
        },
        function(found, done) {
            models.Users.findOne({
                where: {id: found.UserId}
            })
            .then(function(userFound) {
                done(null, userFound,found);
            })
            .catch(function(err) {
                return res.status(500).json({'status':500, 'response': 'impossible de vérifier l\'espace utilisateur, Veuillez réessayer plus tard'});
            });
        },
        function(userFound, found, done) {
            if(firstname || lastname) {
              userFound.update(userProfileAttributes)
              .then(function() {
                done(userFound, found);
              }).catch(function(err) {
                  return res.status(500).json({'status':500, 'response': 'Erreur lors de la modifification'});
              });
            } else {
              done(userFound, found);
            }
          }
      ], function(found, userFound) {
        if (found && userFound) {
          return res.status(201).json({'status':201,'response': 'Vos données ont été modifiées avec succès'});
        } else {
            return res.status(500).json({'status':500, 'response': 'Erreur, Veuillez réessayer plus tard'});
        }
    });

  }
}