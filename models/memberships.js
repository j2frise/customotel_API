'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Memberships extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Memberships.belongsTo(models.Subscriptions, { foreignKey: 'subscriptionId'});
      models.Memberships.belongsTo(models.Hostels, { foreignKey: 'hostelId'});
    }
  };
  Memberships.init({
    expired: DataTypes.DATE,
    nb_account: DataTypes.INTEGER,
    changed: DataTypes.DATE,
    is_expired: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Memberships',
  });
  return Memberships;
};