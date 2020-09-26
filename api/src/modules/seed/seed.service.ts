import fs from 'fs';
import path from 'path';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { Seed } from './seed.entity';
import { Seed as ISeed } from './seed.interface';

const SEEDS_DIR = path.resolve(__dirname, '..', '..', '..', 'seeds');

@Injectable()
export class SeedService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(Seed)
    private readonly seedRepository: Repository<Seed>,
  ) {}

  private async getSeeds() {
    const files = await fs.promises.readdir(SEEDS_DIR);
    const seeds: ISeed[] = [];

    for (const file of files) {
      const module = await import(path.join(SEEDS_DIR, file));

      for (const seed of Object.values<any>(module)) {
        if ('name' in seed)
          seeds.push(new seed());
      }
    }

    return seeds;
  }

  async seed() {
    const queryRunner = this.connection.createQueryRunner();
    const seeds = await this.getSeeds();

    for (const seed of seeds) {
      const existing = await this.seedRepository.count({ where: { name: seed.name } }) !== 0;

      if (existing)
        continue;

      await seed.run(queryRunner);
      await this.seedRepository.save({ name: seed.name });
    }
  }
}
