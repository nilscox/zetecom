module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('user', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    about: DataTypes.STRING,
  }, {
    tableName: 'users',
  });

  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
};
