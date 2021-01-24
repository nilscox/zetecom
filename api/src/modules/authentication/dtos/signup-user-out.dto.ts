import { Expose, Transform } from 'class-transformer';

import { UserDto } from 'src/modules/user/dtos/user.dto';

export class SignupUserDto extends UserDto {
  @Expose({ name: 'requiresEmailValidation' })
  @Transform(({ value }) => !value)
  emailValidated: boolean;
}
