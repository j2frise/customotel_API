'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hostels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Hostels.hasMany(models.Memberships);
      models.Hostels.hasMany(models.Banks);
      models.Hostels.hasMany(models.User_hostels);
    }
  };
  Hostels.init({
    app_id: DataTypes.STRING,
    name: DataTypes.STRING,
    shortname: DataTypes.STRING,
    logo: DataTypes.STRING,
    app_secret: DataTypes.STRING,
    address: DataTypes.TEXT,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Hostels',
  });
  return Hostels;
};