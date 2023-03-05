"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        timestamps: true,
      },
      uuid:{
        type: Sequelize.UUIDV4,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        default: "jhonDoe@mail.com",
        validate: {
          notEmpty: true,
        },
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
        default: "jhonDoeTheDoe",
        validate: {
            notEmpty: true,
            notNull: true,
            len: [2, 40],
        },
    },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        default: "123456",
        validate: {
          notEmpty: true,
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        default: new Date(),
        override: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        default: new Date(),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("Users");
  },
};
