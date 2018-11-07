module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('reactions', 'authorId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('reactions', 'authorId');
  },

};
