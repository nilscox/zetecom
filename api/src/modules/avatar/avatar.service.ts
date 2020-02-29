import * as fs from 'fs';
import * as path from 'path';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as multer from 'multer';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';

const ALLOWED_FORMATS = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/bmp',
  'image/svg',
];

const { USER_AVATAR_DESTINATION } = process.env;

if (process.env.NODE_ENV !== 'test') {
  if (!fs.existsSync(USER_AVATAR_DESTINATION))
    fs.mkdirSync(USER_AVATAR_DESTINATION);
}

export const multerStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, USER_AVATAR_DESTINATION);
  },
  filename(req, file, cb) {
    if (!req.user)
      return cb(new Error('multerStorage: req.user must exist'));

    cb(null, [req.user.nick, Date.now()].join('-') + path.extname(file.originalname));
  },
});

@Injectable()
export class AvatarService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async setUserAvatar(user: User, avatar: any): Promise<User> {
    const { mimetype } = avatar;

    if (!ALLOWED_FORMATS.includes(mimetype))
      throw new Error('invalid image mime type');

    user.avatar = avatar.filename;

    return this.userRepository.save(user, { reload: true });
  }
}
