const Sequelize = require("sequelize");
const sequelize = require("./connectToDB");
const User = sequelize.define("users", {
    id: {
        type: Sequelize.SMALLINT.UNSIGNED,
        autoIncrement: true,
        // allowNull: false,
        primaryKey: true,
        validate: {
            notEmpty: true,
        },
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
});

User.associate = modeles=>{
    User.hasMany(models.Expense, {
        onDelete: "cascade"
    })
}
module.exports = User;
