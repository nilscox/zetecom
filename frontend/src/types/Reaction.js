import User from './User';

class Reaction {

  constructor(obj) {
    Object.assign(this, {
      ...obj,
      author: new User(obj.author),
      date: new Date(obj.date),
      edited: obj.edited ? new Date(obj.date) : null,
      replies: obj.replies ? obj.replies.map(r => new Reaction(r)) : [],
    });
  }

}

export default Reaction;
