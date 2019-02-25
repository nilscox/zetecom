import User from './User';

class Information {

  constructor(obj) {
    Object.assign(this, {
      ...obj,
      creator: new User(obj.creator),
    });
  }

}

export default Information;
