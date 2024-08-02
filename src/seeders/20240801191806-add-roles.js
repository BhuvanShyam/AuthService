"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          name: "ADMIN",
          createdAT: new Date(),
          updatedAT: new Date(),
        },
        {
          name: "CUSTOMER",
          createdAT: new Date(),
          updatedAT: new Date(),
        },
        {
          name: "AIRLINE_BUSINESS",
          createdAT: new Date(),
          updatedAT: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {

  },
};
