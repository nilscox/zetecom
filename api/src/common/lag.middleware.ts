import { Injectable, NestMiddleware, Inject } from '@nestjs/common';

@Injectable()
export class LagMiddleware implements NestMiddleware {

  constructor(
    @Inject('FAKE_LAG')
    private readonly fakeLag: number,
  ) {}

  use(req, res, next) {
    setTimeout(next, this.fakeLag);
  }

}
