module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('reactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      quote: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      label: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      slug: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('reactions');
  },

};