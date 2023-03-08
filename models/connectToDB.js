const Sequelize = require("sequelize");

const sequelize = new Sequelize("expenses-tracker-schema", "reefGuy", "Magic!@#", {
    dialect: "mysql",
    host: "expenses-db.mysql.database.azure.com",
    port: 3306,
    "ssl": true,
    "dialectOptions": {
        "ssl": {
            "require": true
        }
    }
});

module.exports = sequelize;
