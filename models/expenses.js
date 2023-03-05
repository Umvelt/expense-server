'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Expenses extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Expenses.init({
        id: DataTypes.INTEGER,
        expenseName: DataTypes.STRING,
        expenseAmount: DataTypes.INTEGER,
        expenseDate: DataTypes.DATE,
        expenseOwner: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Expenses',
    });
    return Expenses;
};