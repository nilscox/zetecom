/// <reference types="node" />
// tslint:disable no-console

const API_URL = process.env.API_URL || 'http://localhost:3000';

import axios from 'axios';

type QuickReactionType = 'APPROVE' | 'REFUTE' | 'SKEPTIC';

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
  repliesCount: number;
  quickReactionsCount: {
    approve: number;
    refute: number;
    skeptic: number;
  };
  userQuickReaction: QuickReactionType | null;
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

async function loginOrSignup(user: any): Promise<IUser> {
  const signup = async () => {
    const payload = {
      email: user.email,
      password: user.password,
      nick: user.nick,
      avatar: user.avatar,
    };

    await axios.post('/api/email/authorize', { email: user.email }, { validateStatus: s => [200, 500].includes });

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
    const { headers, data } = await login();

    console.log(`user logged in: ${data.id} (${data.nick})`);

    return {
      ...data,
      cookie: headers['set-cookie'][0].split(';')[0],
    };
  } catch (e) {
    const { headers, data } = await signup();

    console.log(`user signed up: ${data.id} (${data.nick})`);

    return {
      ...data,
      cookie: headers['set-cookie'][0].split(';')[0],
    };
  }
}

async function findOrCreateInformation(information: any, creator: IUser): Promise<IInformation> {
  try {
    const { data: found } = await axios.get(`/api/information/by-url/${information.url}`);

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

async function createReaction(subjectId: number, reaction: any, user: IUser, parentId?: number): Promise<IReaction> {
  const hasHistory = reaction.history && reaction.history.length;
  const text = hasHistory ? reaction.history[0] : reaction.text;

  const payload = {
    subjectId,
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

async function createQuickReaction(reactionId: number, type: QuickReactionType, user: IUser): Promise<IReaction> {
  const payload = { type };

  const { data: reaction } = await axios.post(`/api/reaction/${reactionId}/quick-reaction`, payload, {
    headers: { cookie: user.cookie },
  });

  console.log(`quickReaction created: ${reaction.id} (${user.nick}, ${type})`);

  return reaction;
}

async function createSubject(informationId: number, subject: any, user: IUser) {
  const payload = {
    informationId,
    subject: subject.subject,
    quote: subject.quote,
    text: subject.text,
  };

  const { data: created } = await axios.post(`/api/subject`, payload, {
    headers: { cookie: user.cookie },
  });

  console.log(`subject created: ${created.id} (${created.author.nick}, "${created.text.slice(0, 30)}...")`);

  return created;
}

async function main(data: any) {
  axios.defaults.baseURL = API_URL;

  if (!data)
    return 1;

  const users: IUser[] = await Promise.all<IUser>(data.users.map(loginOrSignup));
  const infos = await Promise.all<IInformation>(data.informations.map(i => findOrCreateInformation(i, findUser(users, i.creator))));

  const createReactionRec = async (subjectId: number, reaction: any, parentId?: number) => {
    const created = await createReaction(subjectId, reaction, findUser(users, reaction.author), parentId);

    if (reaction.quickReactions) {
      const { approve, refute, skeptic } = reaction.quickReactions;

      await Promise.all([
        Promise.all(approve.map(u => createQuickReaction(created.id, 'APPROVE', findUser(users, u)))),
        Promise.all(refute.map(u => createQuickReaction(created.id, 'REFUTE', findUser(users, u)))),
        Promise.all(skeptic.map(u => createQuickReaction(created.id, 'SKEPTIC', findUser(users, u)))),
      ]);
    }

    if (reaction.replies) {
      for (const reply of reaction.replies)
        await createReactionRec(subjectId, reply, created.id);
    }
  };

  for (const infoData of data.informations) {
    const info = findInformation(infos, infoData.url);

    for (const subjectData of infoData.subjects) {
      const subject = await createSubject(info.id, subjectData, findUser(users, subjectData.author));

      for (const reaction of subjectData.reactions)
        await createReactionRec(subject.id, reaction);
    }
  }

  return 0;
}

const readInputFromStdin = (): any => {
  const stdin = process.stdin;

  stdin.resume();
  stdin.setEncoding('utf8');

  return new Promise(r => {
    const input = [];

    stdin.on('data', input.push.bind(input));

    stdin.on('end', () => {
      try {
        r(JSON.parse(input.join()));
      } catch (e) {
        console.log('cannot parse json');
        r();
      }
    });
  });
};

(async () => {
  try {
    let input;

    if (process.argv[2]) {
      input = {
        users: require(`${process.argv[2]}/users`),
        infos: require(`${process.argv[2]}/informations`),
      };
    } else {
      input = await readInputFromStdin();
    }

    process.exitCode = await main(input);
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
