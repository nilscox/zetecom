import { Request } from 'express';

import { User } from 'src/modules/user/user.entity';

export type ZCRequest = Request & { user: User };
