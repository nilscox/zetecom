module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('user', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nick: DataTypes.STRING,
    about: DataTypes.STRING,
    avatar: DataTypes.STRING,
  }, {
    tableName: 'users',
  });

  User.associate = function(models) {
    User.hasMany(models.Information);
    User.hasMany(models.Reaction, { foreignKey: 'authorId' });
  };

  return User;
};
