import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reaction } from './reaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reaction]),
  ],
})
export class ReactionModule {}
