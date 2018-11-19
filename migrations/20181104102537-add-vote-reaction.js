module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('votes', 'reactionId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'reactions', key: 'id' },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('votes', 'reactionId');
  },

};
