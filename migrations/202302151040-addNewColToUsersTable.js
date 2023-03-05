module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.resolve(
      queryInterface.addColumn("users", "uuid", {
        type: Sequelize.UUIDV4,
        allowNull: false,
        default: Sequelize.UUIDV4,
      })
    );
  },
  down(queryInterface) {
    return Promise.resolve(queryInterface.removeColumn("users", "uuid"));
  },
};
