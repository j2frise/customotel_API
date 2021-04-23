'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Banks.belongsTo(models.Hostels, { foreignKey: 'hostelId'});
    }
  };
  Banks.init({
    name_bank: DataTypes.STRING,
    name_customer: DataTypes.STRING,
    bic: DataTypes.STRING,
    iban: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Banks',
  });
  return Banks;
};