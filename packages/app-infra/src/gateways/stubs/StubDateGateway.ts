import { DateGateway } from '@zetecom/app-core';

export class StubDateGateway implements DateGateway {
  now = new Date(2020, 0, 1);
}
