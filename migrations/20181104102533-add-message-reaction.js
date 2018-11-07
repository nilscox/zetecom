module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('messages', 'reactionId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'reactions', key: 'id' },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('messages', 'reactionId');
  },

};
