const Sequelize = require("sequelize");
const sequelize = require("./connectToDB");

const Expense = sequelize.define("expenses", {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        timestamps: true,
    },
    uuid: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
    },
    expenseOwner: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false,
        defaultValue: "expense",
        validate: {
            notEmpty: true,
        },
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
});

module.exports = Expense;
