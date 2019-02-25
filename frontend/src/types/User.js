const DEFAULT_AVATAR_URI = '/assets/images/default-avatar.png';

class User {

  constructor(obj) {
    Object.assign(this, {
      ...obj,
      avatar: obj.avatar || DEFAULT_AVATAR_URI,
    });
  }

}

export default User;
