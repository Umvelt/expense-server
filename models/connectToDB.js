const Sequelize = require("sequelize");

const sequelize = new Sequelize("poc", "root", "1989", {
    dialect: "mysql",
    host: "localhost",
});

module.exports = sequelize;
