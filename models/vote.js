module.exports = (sequelize, DataTypes) => {

  const Vote = sequelize.define('vote', {
    approve: DataTypes.BOOLEAN,
  }, {});

  Vote.associate = function(models) {
    Vote.belongsTo(models.User);
    Vote.belongsTo(models.Reaction);
  };

  return Vote;
};
