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
    const roles = await queryInterface.sequelize.query(
      `SELECT id FROM Roles;`
    )
    const rolesRow = roles[0];

    await queryInterface.bulkInsert('UserRoles', [
      {
        userId: usersRow[0].id,
        roleId: rolesRow[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: usersRow[0].id,
        roleId: rolesRow[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: usersRow[0].id,
        roleId: rolesRow[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: usersRow[1].id,
        roleId: rolesRow[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: usersRow[2].id,
        roleId: rolesRow[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: usersRow[2].id,
        roleId: rolesRow[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: usersRow[3].id,
        roleId: rolesRow[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: usersRow[4].id,
        roleId: rolesRow[2].id,
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
    await queryInterface.bulkDelete('UserRoles', null, {});
  }
};
