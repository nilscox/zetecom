import { DateGateway } from '@zetecom/app-core';

export class RealDateGateway implements DateGateway {
  get now(): Date {
    return new Date();
  }
}
