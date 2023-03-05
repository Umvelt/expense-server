'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.resolve(
        queryInterface.addColumn("users", "userName", {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          default: "johnDoeTheDoe",
          validate: {
            notEmpty: true,
            notNull: true,
            len: [2, 40],
          },
        })
    );
  },

  async down (queryInterface) {
    return Promise.resolve(
        queryInterface.removeColumn("expenses", "Test")
    );
  }
};
