import { getCustomRepository } from 'typeorm';

import { SortType } from 'Common/sort-type';

import { User } from '../user/user.entity';
import { Information } from '../information/information.entity';
import { Subject } from '../subject/subject.entity';
import { Reaction } from './reaction.entity';
import { QuickReactionType, QuickReaction } from './quick-reaction.entity';
import { ReactionRepository } from './reaction.repository';

import { createUser } from '../../testing/factories/user.factory';
import { createInformation } from '../../testing/factories/information.factory';
import { createReaction } from '../../testing/factories/reaction.factory';
import { createSubject } from '../../testing/factories/subject.factory';
import { createQuickReaction } from '../../testing/factories/quick-reaction.factory';
import { setupIntgTest } from '../../testing/typeorm/setup-intg-test';

describe('reaction repository', () => {

  setupIntgTest();

  let reactionRepository: ReactionRepository;

  let user: User;
  let information: Information;
  let standaloneRootReaction: Reaction;
  let standaloneChildReaction: Reaction;
  let subject: Subject;
  let subjectRootReaction: Reaction;
  let subjectChildReaction: Reaction;

  let qr1: QuickReaction;
  let qr2: QuickReaction;
  let qr3: QuickReaction;

  beforeAll(async () => {
    reactionRepository = getCustomRepository(ReactionRepository);

    user = await createUser();
    information = await createInformation({ creator: user });
    standaloneRootReaction = await createReaction({ information, author: user });
    standaloneChildReaction = await createReaction({ information, author: user, parent: standaloneRootReaction });
    subject = await createSubject({ information, author: user });
    subjectRootReaction = await createReaction({ information, author: user, subject });
    subjectChildReaction = await createReaction({ information, author: user, subject, parent: subjectRootReaction });

    qr1 = await createQuickReaction({ reaction: standaloneRootReaction, type: QuickReactionType.APPROVE });
    qr2 = await createQuickReaction({ reaction: standaloneRootReaction, type: QuickReactionType.REFUTE });
    qr3 = await createQuickReaction({ reaction: standaloneRootReaction, type: QuickReactionType.SKEPTIC });
  });

  describe('listStandaloneRootReactions', () => {
    it('should find the standalone root reactions', async () => {
      const result = await reactionRepository.findRootReactions(information.id, SortType.DATE_ASC);

      expect(result).toMatchObject([{ id: standaloneRootReaction.id }]);
    });
  });

  describe('getQuickReactionsCounts', () => {
    it('should find the quick reactions counts', async () => {
      const result = await reactionRepository.getQuickReactionsCounts([standaloneRootReaction.id]);

      expect(result).toMatchObject([{
        reactionId: standaloneRootReaction.id,
        quickReactions: {
          [QuickReactionType.APPROVE]: 1,
          [QuickReactionType.REFUTE]: 1,
          [QuickReactionType.SKEPTIC]: 1,
        },
      }]);
    });
  });
});
