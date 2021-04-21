'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userHostelId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'User_hostels',
          key: 'id'
        }
      },
      fullname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pseudo: {
        allowNull: true,
        type: Sequelize.STRING
      },
      avatar: {
        allowNull: false,
        type: Sequelize.STRING
      },
      desc: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      sexe: {
        allowNull: false,
        type: Sequelize.STRING
      },
      uniqid: {
        allowNull: true,
        type: Sequelize.STRING
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: true,
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
    await queryInterface.dropTable('Customers');
  }
};