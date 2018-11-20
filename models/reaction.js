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
    Reaction.Messages = Reaction.hasMany(models.Message);
    Reaction.hasMany(Reaction, { as: 'answers', foreignKey: 'answerToId' });
    Reaction.belongsTo(models.Reaction, { as: 'answerTo', foreignKey: 'answerToId' });
    Reaction.hasMany(models.Vote);

    Reaction.addScope('defaultScope', {
      include: [
        { model: models.Message },
        { model: models.Vote },
      ],
      order: [[models.Message, 'updatedAt']],
    }, { override: true });

    Reaction.addScope('withAuthor', {
      include: [
        { model: models.User, as: 'author' },
      ],
    });
  };

  Reaction.prototype.fillAnswers = function(reactions) {
    this.answers = reactions.filter(r => r.answerToId === this.id);
    this.answers.forEach(a => a.fillAnswers(reactions));
  }

  Reaction.prototype.fillUserVote = function(userId) {
    this.didApprove = this.votes.filter(v => v.approve === true && v.userId === userId).length > 0;
    this.didRefute = this.votes.filter(v => v.approve === false && v.userId === userId).length > 0;
  }

  return Reaction;
};
