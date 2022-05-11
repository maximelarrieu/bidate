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

    const types = await queryInterface.sequelize.query(
      `SELECT id FROM Types;`
    )
    const typesRow = types[0];

    await queryInterface.bulkInsert('Users', [
      {
        username: 'sheguey',
        email: 'contact@maximelarrieu.io',
        birthdate : '1999-01-23',
        type_id: typesRow[0].id,
        password: bcrypt.hashSync('password', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'godgoat',
        email: 'william.gillot@ynov.com',
        birthdate : '1995-06-20',
        type_id: typesRow[1].id,
        password: bcrypt.hashSync('password', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'arthur',
        email: 'arthur.viard@ynov.com',
        birthdate : '1996-06-20',
        type_id: typesRow[0].id,
        password: bcrypt.hashSync('password', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'tibo',
        email: 'thibault.feugere@ynov.com',
        birthdate : '2000-02-20',
        type_id: typesRow[0].id,
        password: bcrypt.hashSync('password', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'test',
        email: 'test.test@ynov.com',
        birthdate : '1997-02-20',
        type_id: typesRow[1].id,
        password: bcrypt.hashSync('password', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'etienne',
        email: 'etienne@burgerking.fr',
        birthdate : '2000-12-26',
        type_id: typesRow[0].id,
        password: bcrypt.hashSync('password', 8),
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
     await queryInterface.bulkDelete('Users', null, {});
  }
};
