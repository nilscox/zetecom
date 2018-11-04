module.exports = (sequelize, DataTypes) => {

  const Message = sequelize.define('message', {
    text: DataTypes.STRING,
  }, {
    tableName: 'messages',
  });

  Message.associate = function(models) {
    Message.belongsTo(models.Reaction);
  };

  return Message;
};
