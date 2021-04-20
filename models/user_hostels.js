'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_hostels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User_hostels.belongsTo(models.Users, {
        foreignKey: {
          allowNull: false
        }
      });
      models.User_hostels.belongsTo(models.Hostels, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  };
  User_hostels.init({
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User_hostels',
  });
  return User_hostels;
};