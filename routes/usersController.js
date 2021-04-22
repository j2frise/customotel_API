//imports
var bcrypt = require('bcryptjs');
var models = require('../models');
var asyncLib = require('async');
var html = require('../send/html')
const { Op } = require("sequelize");
var jwtUtils = require('../utils/jwt.utils');

//Routes
module.exports = {
  registerUser: function(req, res){

      //get params
      var email = req.body.email;
      var firstname = req.body.firstname?req.body.firstname:null;
      var lastname = req.body.lastname?req.body.lastname:null;

      asyncLib.waterfall([
          function(done){
              //verify user exist
              models.Users.findOne({
                  attributes: ['email'],
                  where: {email: email}
              })
              .then(function(userFound){
                  done(null, userFound);
              })
              .catch(function(error){
                  return res.status(500).json({'status':500, 'response': 'Erreur, Veuillez réessayer plus tard'});
              })
          },
          function(userFound, done){
              if(!userFound){
                models.Users.create({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    isActived: false
                })
                .then(function(newUser){
                    done(newUser);
                })
                .catch(function(err){
                    return res.status(500).json({'status':500, 'response': 'opération échouée'});
                });
              } else {
                  return res.status(409).json({'status':409, 'response': 'Cet utilisateur existe déjà'});
              }
          }
      ], function(newUser){
          if(newUser){
            var token = jwtUtils.generateTokenForUser(newUser.id);
            html.register(newUser.email, token);
            return res.status(201).json({"status":201, "data": {'userId': newUser.id, 'token': token}});
          } else {
              return res.status(500).json({'status':500, 'response': 'opération échouée'});
          }
      });
  },

  login: function(req, res){
    //get params
    var email = req.body.email;

    asyncLib.waterfall([
        function(done) {
          //verify hostel exist
          models.Users.findOne({
            where: { email: email, deletedAt: { [Op.eq]: null } }
          })
          .then(function(userFound) {
            done(null, userFound);
          })
          .catch(function(err) {
            return res.status(500).json({'status':500, 'response': err+' => (1) impossible de vérifier les données de l\'hotel, Veuillez réessayer plus tard'});
          });
        },
        function(userFound, done) {
          if(!userFound){
            return res.status(404).json({'status':404, 'response': 'Cet utilisateur n\'existe pas'});
          } else {
            //verify user exist
            if(!userFound.isActived){
              var token = jwtUtils.generateTokenForUser(userFound.id);
              html.register(email, token);
              return res.status(500).json({'status':503, 'response': 'Votre compte n\'est pas activé, veuillez vérifier vos mails ou contactez le service client'});
            } else {
              models.User_hostels.findAll({
                attributes: ['userId', 'hostelId', 'role', 'is_admin'],
                where: { UserId: userFound.id, deletedAt: { [Op.eq]: null } }
              })
              .then(function(found) {
                done(found, userFound);
              })
              .catch(function(err) {
                return res.status(500).json({'status':500, 'response': err+' => (1) impossible de vérifier l\'utilisateur, Veuillez réessayer plus tard'});
              });
            }
          }
        }
      ], function(found, userFound) {
        if (found) {
          return res.status(201).json({
            'status':201,
            'data': {
              'hostels': found,
              'token': jwtUtils.generateTokenForUser(userFound.id)
            }
          });
        } else {
            return res.status(500).json({'status':500, 'response': 'Erreur, Veuillez réessayer plus tard'});
        }
    });
  },

  activateAccount: function(req, res){
    var headerAuth  = req.headers['authorization'];
    var user = jwtUtils.getUserHostel(headerAuth);
    if(!user){
        return res.status(500).json({'status':503, 'response': 'accès interdit ou incorrect'});
    }

    asyncLib.waterfall([
      function(done) {
        //verify hostel exist
        models.Users.findOne({
          where: { id: user.userId, deletedAt: { [Op.eq]: null } }
        })
        .then(function(userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({'status':500, 'response': 'impossible de vérifier les données de l\'utilisateur, Veuillez réessayer plus tard'});
        });
      },
      function(userFound, done) {
        if(!userFound){
          return res.status(404).json({'status':404, 'response': 'Cet utilisateur n\'existe pas'});
        } else {
          //verify user exist
          userFound.update({isActived: true})
          .then(function() {
            done(userFound);
          }).catch(function(err) {
              return res.status(500).json({'status':500, 'response': 'Erreur lors de la création'});
          });
        }
      }
    ], function(userFound) {
      if (userFound) {
        return res.status(201).json({'status':201, 'response': 'Compte activé avec succès, veuillez vous connecter'});
      } else {
          return res.status(500).json({'status':500, 'response': 'Erreur, Veuillez réessayer plus tard'});
      }
    });
  }
}