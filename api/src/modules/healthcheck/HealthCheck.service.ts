import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import fetch from 'node-fetch';

const { EXTENSION_URL, WEBSITE_URL } = process.env;

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

  async checkExtension() {
    try {
      await fetch(EXTENSION_URL);
      return true;
    } catch (_e) {
      return false;
    }
  }

  async checkWebsite() {
    try {
      await fetch(WEBSITE_URL);
      return true;
    } catch (_e) {
      return false;
    }
  }

}
