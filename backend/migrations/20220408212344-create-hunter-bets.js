'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HunterBets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      date_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Dates',
          key: 'id'
        }
      },
      dater_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      amount_0: {
        type: Sequelize.FLOAT
      },
      amount_1: {
        type: Sequelize.FLOAT
      },
      amount_2: {
        type: Sequelize.FLOAT
      },
      amount_3: {
        type: Sequelize.FLOAT
      },
      amount_4: {
        type: Sequelize.FLOAT
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('HunterBets');
  }
};