import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';

const ALLOWED_FORMATS = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/bmp',
  'image/svg',
];

@Injectable()
export class AvatarService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async changeAvatar(user: User, avatar: Express.Multer.File): Promise<User> {
    const { mimetype } = avatar;

    // TODO: error format
    if (!ALLOWED_FORMATS.includes(mimetype))
      throw new Error('invalid image mime type');

    user.avatar = avatar.filename;

    return this.userRepository.save(user, { reload: true });
  }
}
