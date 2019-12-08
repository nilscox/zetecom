import { ReactionRepository } from './reaction.repository';
import { getManager, createConnection, Connection, getConnection, getCustomRepository, DeepPartial, getRepository, Repository } from 'typeorm';
import { Information } from '../information/information.entity';
import { User } from '../user/user.entity';
import { Reaction } from './reaction.entity';
import { Message } from './message.entity';
import { SortType } from 'Common/sort-type';
import { Subject } from '../subject/subject.entity';
import { QuickReactionType, QuickReaction } from './quick-reaction.entity';

const createDatabaseConnection = async () => {
  return createConnection({
    database: 'test',
    dropSchema: true,
    entities: ['src/**/*.entity.ts'],
    host: 'localhost',
    // logging: ['query', 'error'],
    password: 'root',
    port: 5432,
    synchronize: true,
    type: 'postgres',
    username: 'root',
  });
};

const createUser = async (data?: DeepPartial<User>) => {
  const manager = await getManager();

  const rnd = Math.random().toString(32).slice(6);

  const user = manager.create(User, {
    nick: `user_${rnd}`,
    email: `${rnd}@domain.tld`,
    password: 'password',
    emailValidationToken: 'token',
    ...data,
  });

  return manager.save(user);
};

const createInformation = async (data?: DeepPartial<Information>) => {
  const manager = await getManager();

  const information = manager.create(Information, {
    url: 'https://news.fake/article/1',
    title: 'Fake News!',
    ...data,
  });

  return manager.save(information);
};

const createSubject = async (data?: DeepPartial<Subject>) => {
  const manager = await getManager();

  const subject = manager.create(Subject, {
    subject: 'Subject',
    quote: 'Quote',
    ...data,
  });

  return manager.save(subject);
};

const createReaction = async (data?: DeepPartial<Reaction>) => {
  const manager = await getManager();

  const message = manager.create(Message, {
    text: 'Text',
  });

  await manager.save(message);

  const reaction = manager.create(Reaction, {
    messages: [message],
    ...data,
  });

  return manager.save(reaction);
};

const createQuickReaction = async (data?: DeepPartial<QuickReaction>) => {
  const manager = await getManager();

  if (!data.user)
    data.user = await createUser();

  const quickReaction = manager.create(QuickReaction, {
    type: QuickReactionType.APPROVE,
    ...data,
  });

  return manager.save(quickReaction);
}

describe('reaction repository', () => {

  let connection: Connection;
  let reactionRepository: ReactionRepository;

  beforeAll(async () => {
    connection = await createDatabaseConnection();
    reactionRepository = getCustomRepository(ReactionRepository);
  });

  afterAll(async () => {
    await connection.close();
  });

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
      const result = await reactionRepository.listStandaloneRootReactions(information.id, SortType.DATE_ASC);

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
