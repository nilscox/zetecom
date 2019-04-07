const axios = require('axios');

const usersData = require('./data/users');
const infosData = require('./data/informations');

type ShortReplyType = 'APPROVE' | 'REFUTE' | 'SKEPTIC';

interface IUser {
  id: number;
  nick: string;
  email: string;
  password: string;
  avatar: string | null;
  created: string;
  cookie?: string;
}

interface IInformation {
  id: number;
  creator: IUser;
  title: string;
  url: string;
}

interface IReaction {
  id: number;
  slug: string;
  label: 'SOURCE' | 'METHOD';
  quote: string | null;
  edited: false | string;
  text: string;
  date: string;
  repliesCount: number,
  shortRepliesCount: {
    approve: number;
    refute: number;
    skeptic: number;
  };
  userShortReply: ShortReplyType | null;
  author: IUser;
}

function findUser(users: IUser[], nick: string): IUser {
  return users.find(u => u.nick === nick);
}

function findInformation(informations: IInformation[], url: string): IInformation {
  return informations.find(i => i.url === url);
}

async function createUserOrLogin(user: any): Promise<IUser> {
  const signup = async () => {
    const payload = {
      email: user.email,
      password: user.password,
      nick: user.nick,
    };

    return axios.post('/api/auth/signup', payload);
  };

  const login = async () => {
    const payload = {
      email: user.email,
      password: user.password,
    };

    return axios.post('/api/auth/login', payload);
  };

  try {
    const { headers, data } = await signup();

    return {
      ...data.user,
      cookie: headers['set-cookie'][0].split(';')[0],
    };
  } catch (e) {
    const { response: r } = e;

    if (!r || r.status !== 400 || r.data.message !== 'EMAIL_ALREADY_EXISTS')
      throw e;

    const { headers, data } = await login();

    return {
      ...data.user,
      cookie: headers['set-cookie'][0].split(';')[0],
    };
  }
}

async function findOrCreateInformation(information: any, creator: IUser): Promise<IInformation> {
  const match = /watch\?v=(.*)$/.exec(information.url);

  if (!match)
    throw new Error('Missing youtubeId in URL: ' + information.url);

  try {
    const { data: found } = await axios.get(`/api/information/by-youtubeId/${match[1]}`);

    return found;
  } catch (e) {
    const { response: r } = e;

    if (!r || r.status !== 404)
      throw e;

    const payload = {
      title: information.title,
      url: information.url,
    };

    const { data: created } = await axios.post('/api/information', payload, {
      headers: { cookie: creator.cookie },
    });

    return created;
  }
}

async function createReaction(informationId: number, reaction: any, user: IUser, parentId?: number): Promise<IReaction> {
  const payload = {
    informationId,
    parentId,
    label: reaction.label,
    quote: reaction.quote,
    text: reaction.text,
  };

  const { data: created } = await axios.post('/api/reaction', payload, {
    headers: { cookie: user.cookie },
  });

  return created;
}

async function createShortReply(reactionId: number, type: ShortReplyType, user: IUser): Promise<IReaction> {
  const payload = { type };

  const { data: reaction } = await axios.post(`/api/reaction/${reactionId}/short-reply`, payload, {
    headers: { cookie: user.cookie },
  });

  return reaction;
}

async function main() {
  axios.defaults.baseURL = 'http://localhost:3000';

  const users: IUser[] = await Promise.all<IUser>(usersData.map(createUserOrLogin));
  const infos = await Promise.all<IInformation>(infosData.map(i => findOrCreateInformation(i, findUser(users, i.creator))));

  const createReactionRec = async (informationId: number, reaction: any, parentId?: number) => {
    const created = await createReaction(informationId, reaction, findUser(users, reaction.author), parentId);

    if (reaction.shortReplies) {
      const { approve, refute, skeptic } = reaction.shortReplies;

      await Promise.all([
        Promise.all(approve.map(u => createShortReply(created.id, 'APPROVE', findUser(users, u)))),
        Promise.all(refute.map(u => createShortReply(created.id, 'REFUTE', findUser(users, u)))),
        Promise.all(skeptic.map(u => createShortReply(created.id, 'SKEPTIC', findUser(users, u)))),
      ]);
    }

    if (reaction.replies) {
      for (const reply of reaction.replies)
        await createReactionRec(informationId, reply, created.id);
    }
  };

  for (let i = 0; i < infosData.length; ++i) {
    const info = findInformation(infos, infosData[i].url);

    for (const reaction of infosData[i].reactions)
      await createReactionRec(info.id, reaction);
  }

  return 0;
}

(async () => {
  try {
    process.exitCode = await main();
  } catch (e) {
    const { response } = e;

    if (response) {
      console.error(e.message);
      console.error(response.data);
    } else {
      console.error(e);
    }

    process.exitCode = 1;
  }
})();
