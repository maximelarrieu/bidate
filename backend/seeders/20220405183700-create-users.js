'use strict';
let bcrypt = require("bcryptjs");

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
      `SELECT id FROM Types;`
    )
    const usersRow = users[0];

    await queryInterface.bulkInsert('Users', [
      {
        username: 'sheguey',
        email: 'contact@maximelarrieu.io',
        birthdate : '1999-01-23',
        type_id: usersRow[0].id,
        password: bcrypt.hashSync('password', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Types', null, {});
  }
};
