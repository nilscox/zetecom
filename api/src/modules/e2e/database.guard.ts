import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ConfigService } from 'src/modules/config/config.service';

@Injectable()
export class DatabaseGuard implements CanActivate {
  constructor(private readonly configService: ConfigService, private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const DB_NAME = this.configService.get('DB_NAME');
    const expected = this.reflector.get<string>('database', context.getHandler());

    if (DB_NAME === expected) {
      return true;
    }

    throw new NotFoundException();
  }
}
