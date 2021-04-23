//imports
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');
var asyncLib = require('async');
const { Op } = require("sequelize");
var moment  = require('moment');

//Routes
module.exports = {
  subscriptionList: function(req, res) {
    models.Subscriptions.findAll({
        order: [['price', 'desc']],
        where: {
          deletedAt: {
            [Op.eq]: null
          }
        }
      }).then(function(list) {
        if (list.length) {
          res.status(200).json({"status":200, "data":list});
        } else {
          res.status(404).json({ "status": 404, "response": "Aucune donnée trouvée" });
        }
      }).catch(function(err) {
        res.status(500).json({"status": 500, "response": "Erreur, veuillez réessayer plutard" });
      });
  },
  expiredTheSubscribe:function(req, res){

    asyncLib.waterfall([
        function(done) {
          //verify hostel exist
          var current_date = moment().format("YYYY-MM-DD HH:mm:ss");
          models.Memberships.findAll({
            include : [
              {
                model: models.Hostels, 
                required: true,
                include : [
                  {
                    model: models.User_hostels, 
                    required: true,
                    include: [
                      {model: models.Users, required: true}
                    ],
                    where: {is_admin: true}
                  }
                ]
              },
              {model: models.Subscriptions, required: true}
            ],
            where: {
              is_expired: true,
              expired: {
                [Op.lte]: current_date
              }
            }
          })
          .then(function(memberfound) {
            done(null, memberfound);
          })
          .catch(function(err) {
            return res.status(500).json({'status':500, 'response': 'impossible de vérifier l\'espace utilisateur, Veuillez réessayer plus tard'});
          });
        },
        function(memberfound, done) {
          if(memberfound.length){
            done(memberfound);
            memberfound.update({ is_expired: true})
            .then(function() {
              done(memberfound);
            }).catch(function(err) {
                return res.status(500).json({'status':500, 'response': 'Erreur lors de la création'});
            });
          } else {
            return res.status(404).json({'status':404, 'response': 'Pas d\'expiration en cours'});
          }
        }
      ], function(memberfound) {
        if (memberfound) {
          memberfound.forEach(element => {
            expiredSibscribe(element);
          });
            
          return res.status(201).json({'status':201, 'data': memberfound});
        } else {
            return res.status(500).json({'status':500, 'response': 'Erreur, Veuillez réessayer plus tard'});
        }
    });
  }
}
