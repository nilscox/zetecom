import { Inject, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LagMiddleware implements NestMiddleware {
  constructor(
    @Inject('FAKE_LAG')
    private readonly fakeLag: number,
  ) {}

  use(req: unknown, res: unknown, next: () => void) {
    if (this.fakeLag) {
      setTimeout(next, this.fakeLag);
    }
  }
}
