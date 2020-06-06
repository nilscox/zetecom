import { Controller, Get } from '@nestjs/common';

import * as pkg from '../package.json';

import { ConfigService } from './modules/config/config.service';

@Controller()
export class AppController {

  constructor(
    private readonly configService: ConfigService,
  ) {}

  @Get('version')
  version(): string {
    return pkg.version;
  }

  @Get('__coverage__')
  coverage() {
    if (this.configService.get('CI') !== 'true')
      return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { __coverage__: coverage } = global as any;

    if (coverage)
      return { coverage };
  }

}
