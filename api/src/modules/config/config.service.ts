import { Injectable } from '@nestjs/common';

import { env, EnviornmentVariable } from './env';

@Injectable()
export class ConfigService {

  private env: typeof env;

  constructor() {
    this.env = env;
  }

  get(key: EnviornmentVariable) {
    return this.env[key];
  }
}
