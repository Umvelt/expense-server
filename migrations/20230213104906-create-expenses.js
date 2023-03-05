"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("expenses", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        timestamps: true,
      },
      expenseName: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false,
        default: "expense",
        validate: {
          notEmpty: true,
        },
      },
      expenseAmount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
        validate: {
          notEmpty: true,
        },
      },
      expenseDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        default: new Date(),
        validate: {
          notEmpty: true,
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: new Date(),
        onUpdate: {
          default: new Date()
        }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Expenses");
  },
};
