import { Repository, EntityRepository } from 'typeorm';

import { Reaction } from './reaction.entity';

@EntityRepository(Reaction)
export class ReactionRepository extends Repository<Reaction> {

}
