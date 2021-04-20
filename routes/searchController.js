//imports
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');
var asyncLib = require('async');
const { Op } = require("sequelize");

// Constants
const ITEMS_LIMIT   = 50;

//Routes
module.exports = {
    listProfessional: function(req, res) {
        var fields  = req.query.fields;
        var limit   = parseInt(req.query.limit);
        var offset  = parseInt(req.query.offset);
        var order   = req.query.order;
        var location   = req.query.location;
        var specialization   = req.query.specialization;
        var job   = req.query.job;
        var language   = req.query.language;
        var rung   = req.query.rung;
    
        if (limit > ITEMS_LIMIT) {
          limit = ITEMS_LIMIT;
        }
        
        var firstCondition = {};
        if(specialization != null){
            firstCondition.specialization = {[Op.substring]:specialization};
        }
        if(location != null){
            firstCondition.address = {[Op.substring]:location};
        }

        if(job != null){
            firstCondition.jobId = job;
        }


        var secondCondition = {};
        var listLanguage = [];

        if (language != null) {
            var tabLanguage = language.split(',');
            for (var i=0; i < tabLanguage.length; i++) {
                var valueObj = {
                    LanguageId: tabLanguage[i]
                };
                listLanguage.push(valueObj);
            }

            if (listLanguage.length != 0) {
                secondCondition = {
                    [Op.or]: listLanguage
                }
            }
        }

        var thirdCondition = {};
        var listRung = [];

        if (rung != null) {
            var tabRung = rung.split(',');
            for (var j=0; j < tabRung.length; j++) {
                var valueObjR = {
                    name: tabRung[j]
                };
                listRung.push(valueObjR);
            }

            if (listRung.length != 0) {
                thirdCondition = {
                    [Op.or]: listRung
                }
            }
        }

        models.Professional.findAll({
            order: [(order != null) ? order.split(':') : ['title', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            where: firstCondition,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [
                { model: models.Job},
                {
                    model: models.User,
                    attributes: ['id', 'email', 'status', 'lastLogin'],
                    include: [
                        { 
                            model: models.Rung,
                            where: thirdCondition
                        },
                        {
                            model: models.Speak,
                            include: [{ model: models.Language }],
                            where: secondCondition
                        }
                    ],
                    where : {status: 1}
                }
            ]
          }).then(function(professionals) {
            if (professionals) {
              res.status(200).json(professionals);
            } else {
              res.status(404).json({ "error": "aucun professionel du droit trouvé" });
            }
          }).catch(function(err) {
            console.log(err);
            res.status(500).json({ "error": err+" => Champs invalides" });
        });
    }
}