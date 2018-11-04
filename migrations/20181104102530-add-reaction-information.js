module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('reactions', 'informationId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'informations', key: 'id' },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('reactions', 'informationId');
  },

};
