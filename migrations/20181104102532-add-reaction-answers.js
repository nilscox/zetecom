module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('reactions', 'answerToId', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: { model: 'reactions', key: 'id' },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('reactions', 'answerToId');
  },

};
