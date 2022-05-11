'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM Users;`
    )
    const usersRow = users[0];
    const dates = await queryInterface.sequelize.query(
      `SELECT id FROM Dates;`
    )
    const datesRow = dates[0];

    await queryInterface.bulkInsert('DaterBets', [
      {
        user_id: usersRow[1].id,
        date_id: datesRow[0].id,
        amount_0: 0.2,
        amount_1: 0.154,
        amount_2: null,
        amount_3: null,
        amount_4: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: usersRow[3].id,
        date_id: datesRow[0].id,
        amount_0: 0.7,
        amount_1: 0.069,
        amount_2: null,
        amount_3: null,
        amount_4: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};