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
  const user = users.find(u => u.nick === nick);

  if (!user)
    throw new Error(`cannot find user "${nick}"`);

  return user;
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

    console.log(`user created: ${data.user.id} (${data.user.nick})`);

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

    console.log(`information created: ${created.id} (${created.url})`);

    return created;
  }
}

async function createReaction(informationId: number, reaction: any, user: IUser, parentId?: number): Promise<IReaction> {
  const hasHistory = reaction.history && reaction.history.length;
  const text = hasHistory ? reaction.history[0] : reaction.text;

  const payload = {
    informationId,
    parentId,
    label: reaction.label,
    quote: reaction.quote,
    text,
  };

  let { data: created } = await axios.post('/api/reaction', payload, {
    headers: { cookie: user.cookie },
  });

  if (hasHistory) {
    const edits = [...reaction.history.slice(1), reaction.text];

    for (let i = 0; i < edits.length; ++i) {
      const editPayload = { text: edits[i] };

      const result = await axios.put(`/api/reaction/${created.id}`, editPayload, {
        headers: { cookie: user.cookie },
      });

      created = result.data;
    }
  }

  console.log(`reaction created: ${created.id} (${created.author.nick}, "${created.text.slice(0, 30)}...")`);

  return created;
}

async function createShortReply(reactionId: number, type: ShortReplyType, user: IUser): Promise<IReaction> {
  const payload = { type };

  const { data: reaction } = await axios.post(`/api/reaction/${reactionId}/short-reply`, payload, {
    headers: { cookie: user.cookie },
  });

  console.log(`shortReply created: ${reaction.id} (${user.nick}, ${type})`);

  return reaction;
}

async function main() {
  axios.defaults.baseURL = process.env.BASE_URL || 'http://localhost:3000';

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
      console.error('Error:', e.message);
      console.error(response.data);
    } else if (e.code === 'ECONNREFUSED') {
      console.error('Error:', e.message);
    } else {
      console.error(e);
    }

    process.exitCode = 1;
  }
})();
