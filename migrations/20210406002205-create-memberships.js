'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Memberships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subscriptionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Subscriptions',
          key: 'id'
        }
      },
      hostelId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Hostels',
          key: 'id'
        }
      },
      expired: {
        allowNull: false,
        type: Sequelize.DATE
      },
      nb_account: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      changed: {
        allowNull: true,
        type: Sequelize.DATE
      },
      is_expired: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Memberships');
  }
};