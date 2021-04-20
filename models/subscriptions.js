'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscriptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Subscriptions.hasMany(models.Memberships);
    }
  };
  Subscriptions.init({
    name: DataTypes.STRING,
    resume: DataTypes.STRING,
    nb_account: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    logo: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Subscriptions',
  });
  return Subscriptions;
};