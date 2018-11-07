module.exports = (sequelize, DataTypes) => {

  const Reaction = sequelize.define('reaction', {
    quote: DataTypes.STRING,
    label: DataTypes.INTEGER,
    slug: DataTypes.STRING,
  }, {
    tableName: 'reactions',
  });

  Reaction.associate = function(models) {
    Reaction.belongsTo(models.Information);
    Reaction.belongsTo(models.User, { as: 'author', foreignKey: 'authorId' });
    Reaction.hasMany(models.Message);
    Reaction.hasMany(Reaction, { as: 'answers', foreignKey: 'answerToId' });
    Reaction.belongsTo(models.Reaction, { as: 'answerTo', foreignKey: 'answerToId' });

    Reaction.addScope('defaultScope', {
      include: [
        { model: models.User, as: 'author' },
        { model: models.Message },
      ],
    }, { override: true });
  };

  Reaction.prototype.fillAnswers = function(reactions) {
    this.answers = reactions.filter(r => r.answerToId === this.id);
    this.answers.forEach(a => a.fillAnswers(reactions)); 
  }

  return Reaction;
};
