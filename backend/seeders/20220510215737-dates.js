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

    await queryInterface.bulkInsert('Dates', [
      {
        user_id: usersRow[0].id,
        isEnded: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        endedAt: new Date()
      },
      {
        user_id: usersRow[0].id,
        isEnded: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        endedAt: new Date()
      },
      {
        user_id: usersRow[1].id,
        isEnded: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        endedAt: new Date()
      },
      {
        user_id: usersRow[2].id,
        isEnded: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        endedAt: new Date()
      },
      {
        user_id: usersRow[1].id,
        isEnded: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        endedAt: new Date()
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
     await queryInterface.bulkDelete('Dates', null, {});
  }
};
