import path from 'path';
import { promisify } from 'util';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import glob from 'glob';
import { Connection, Repository } from 'typeorm';

import { ConfigService } from 'src/modules/config/config.service';
import { LoggerService } from 'src/modules/logger/logger.service';

import { Seed } from './seed.entity';
import { Seed as ISeed } from './seed.interface';

@Injectable()
export class SeedService {
  constructor(
    private logger: LoggerService,
    private readonly configService: ConfigService,
    private readonly connection: Connection,
    @InjectRepository(Seed)
    private readonly seedRepository: Repository<Seed>,
  ) {
    this.logger.setContext('SeedService');
  }

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
    this.logger.verbose('executing seeds');

    const queryRunner = this.connection.createQueryRunner();
    const seeds = await this.getSeeds();

    this.logger.verbose(`${seeds.length} seed${seeds.length >= 2 ? 's' : ''} loaded`);

    for (const seed of seeds) {
      this.logger.verbose(`loading seed ${seed.name}`);

      const existing = (await this.seedRepository.count({ where: { name: seed.name } })) !== 0;

      if (existing) {
        this.logger.verbose(`${seed.name} was already executed, skipping`);
        continue;
      }

      this.logger.verbose(`executing ${seed.name}`);

      await seed.run(queryRunner, this.logger);
      await this.seedRepository.save({ name: seed.name });

      this.logger.verbose(`${seed.name} executed successfully`);
    }
  }
}
