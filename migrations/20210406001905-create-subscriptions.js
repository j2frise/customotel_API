'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Subscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      resume: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nb_account: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      logo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      duration: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Subscriptions');
  }
};