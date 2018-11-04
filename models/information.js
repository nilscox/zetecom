module.exports = (sequelize, DataTypes) => {

  const Information = sequelize.define('information', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    slug: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    tableName: 'informations',
  });

  Information.associate = function(models) {
    Information.hasMany(models.Reaction);
  };

  return Information;
};
