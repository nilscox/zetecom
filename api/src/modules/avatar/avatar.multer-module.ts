import path from 'path';

import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';

import { ZCRequest } from 'src/common/zc-request.type';
import { ConfigModule } from 'src/modules/config/config.module';
import { ConfigService } from 'src/modules/config/config.service';

export const AvatarMulterModule = MulterModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const USER_AVATAR_DESTINATION = configService.get('USER_AVATAR_DESTINATION');

    const storage = multer.diskStorage({
      destination(req, file, cb) {
        cb(null, USER_AVATAR_DESTINATION);
      },
      filename(req: ZCRequest, file, cb) {
        if (!req.user)
          return cb(new Error('avatar module: req.user must exist'), '');

        cb(null, [req.user.nick, Date.now()].join('-') + path.extname(file.originalname));
      },
    });

    return { storage };
  },
  inject: [ConfigService],
});
