const { User } = require('./index');

module.exports = (sequelize, DataTypes) => {

  const Information = sequelize.define('information', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    slug: DataTypes.STRING,
    image: DataTypes.STRING,
    youtubeId: DataTypes.STRING,
  }, {
    tableName: 'informations',
  });

  Information.associate = function(models) {
    Information.belongsTo(models.User);
    Information.hasMany(models.Reaction);

    Information.addScope('defaultScope', {
      include: [
        { model: models.User },
      ],
    }, { override: true });
  };

  return Information;
};
