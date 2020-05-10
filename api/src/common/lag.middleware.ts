import { Inject, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LagMiddleware implements NestMiddleware {

  constructor(
    @Inject('FAKE_LAG')
    private readonly fakeLag: number,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  use(req: any, res: any, next: () => void) {
    setTimeout(next, this.fakeLag);
  }

}
