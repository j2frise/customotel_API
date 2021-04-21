'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Rates.belongsTo(models.User_hostels, {
        foreignKey: {
          allowNull: false
        }
      });
      models.Rates.belongsTo(models.Customers, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  };
  Rates.init({
    rating: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Rates',
  });
  return Rates;
};