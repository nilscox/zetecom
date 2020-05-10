import * as path from 'path';

import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

export const AvatarMulterModule = MulterModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const USER_AVATAR_DESTINATION = configService.get('USER_AVATAR_DESTINATION');

    const storage = multer.diskStorage({
      destination(req, file, cb) {
        cb(null, USER_AVATAR_DESTINATION);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      filename(req: any, file, cb) {
        if (!req.user)
          return cb(new Error('avatar module: req.user must exist'), null);

        cb(null, [req.user.nick, Date.now()].join('-') + path.extname(file.originalname));
      },
    });

    return { storage };
  },
  inject: [ConfigService],
});
