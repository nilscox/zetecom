import { IsEnum } from 'class-validator';

import { Role } from 'src/modules/authorization/roles.enum';

export class UpdateUserRoleInDto {
  constructor(partial: Partial<UpdateUserRoleInDto>) {
    Object.assign(this, partial);
  }

  @IsEnum(Role, { each: true })
  roles: Role[];

}
