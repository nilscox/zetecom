import { SetMetadata } from '@nestjs/common';

import { Role } from 'src/modules/authorization/roles.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
