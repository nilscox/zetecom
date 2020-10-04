import path from 'path';
import { promisify } from 'util';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import glob from 'glob';
import { Connection, Repository } from 'typeorm';

import { ConfigService } from '../config/config.service';

import { Seed } from './seed.entity';
import { Seed as ISeed } from './seed.interface';

@Injectable()
export class SeedService {
  constructor(
    private readonly configService: ConfigService,
    private readonly connection: Connection,
    @InjectRepository(Seed)
    private readonly seedRepository: Repository<Seed>,
  ) {}

  private async getSeeds() {
    const DB_SEEDS = this.configService.get('DB_SEEDS');

    const files = await promisify(glob)(DB_SEEDS);
    const seeds: ISeed[] = [];

    for (const file of files) {
      const module = await import(path.join(process.cwd(), file));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const seed of Object.values<any>(module)) {
        if ('name' in seed) {
          seeds.push(new seed());
        }
      }
    }

    return seeds;
  }

  async seed() {
    const queryRunner = this.connection.createQueryRunner();
    const seeds = await this.getSeeds();

    for (const seed of seeds) {
      const existing = (await this.seedRepository.count({ where: { name: seed.name } })) !== 0;

      if (existing) {
        continue;
      }

      await seed.run(queryRunner);
      await this.seedRepository.save({ name: seed.name });
    }
  }
}
