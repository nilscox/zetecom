import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';

@Injectable()
export class HealthCheckService {

  async checkDatabase() {
    try {
      await getConnection().query('SELECT "id" FROM "user"');
      return true;
    } catch (_e) {
      return false;
    }
  }

}
