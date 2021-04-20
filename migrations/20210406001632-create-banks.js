'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Banks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hostelId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Hostels',
          key: 'id'
        }
      },
      name_bank: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name_customer: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bic: {
        allowNull: false,
        type: Sequelize.STRING
      },
      iban: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Banks');
  }
};