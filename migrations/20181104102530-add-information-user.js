module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('informations', 'userId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('informations', 'userId');
  },

};
