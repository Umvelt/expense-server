module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.resolve(
      queryInterface.addColumn("expenses", "Test", {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      })
    );
  },
  down(queryInterface, Sequelize) {
    return Promise.resolve(
      queryInterface.removeColumn("expenses", "Test")
    );
  },
};
