import { Expose } from 'class-transformer';

import { User } from '../../../modules/user/user.entity';

export class SignupUserOutDto extends User {

  @Expose()
  requiresEmailValidation: boolean;

}
