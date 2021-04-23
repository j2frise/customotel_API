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
      models.Hostels.hasMany(models.Memberships,{ foreignKey: 'hostelId'});
      models.Hostels.hasMany(models.Banks,{ foreignKey: 'hostelId'});
      models.Hostels.hasMany(models.User_hostels,{ foreignKey: 'hostelId'});
    }
  };
  Hostels.init({
    app_id: DataTypes.STRING,
    name: DataTypes.STRING,
    shortname: DataTypes.STRING,
    logo: DataTypes.TEXT,
    token: DataTypes.STRING,
    address: DataTypes.TEXT,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Hostels',
  });
  return Hostels;
};