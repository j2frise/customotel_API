'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Customers.hasMany(models.Rates,{ foreignKey: 'customerId'} );
      models.Customers.belongsTo(models.User_hostels, { foreignKey: 'userHostelId'});
    }
  };
  Customers.init({
    fullname: DataTypes.STRING,
    pseudo: DataTypes.STRING,
    avatar: DataTypes.STRING,
    desc: DataTypes.TEXT,
    sexe: DataTypes.STRING,
    uniqid: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Customers',
  });
  return Customers;
};