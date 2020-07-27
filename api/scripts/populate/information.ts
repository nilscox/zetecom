import axios from 'axios';

import { InformationDto } from './dtos/Information';
import { FindUser } from './main';
import { createReaction } from './reaction';

const findInformation = async (information: InformationDto) => {
  const { data } = await axios.get('/api/information/by-identifier/' + encodeURIComponent(information.identifier));

  return data;
};

const createInformation = async (information: InformationDto, findUser: FindUser) => {
  const creator = findUser(information.creator);
  const payload = {
    identifier: information.identifier,
    url: information.url,
    title: information.title,
  };

  const { data } = await axios.post('/api/information', payload, {
    headers: { cookie: creator.cookie },
  });

  return data;
};

export const findOrCreateInformation = async (information: InformationDto, findUser: FindUser) => {
  try {
    return await findInformation(information);
  } catch (e) {
    if (!e.response || e.response.status !== 404)
      throw e;

    const created = await createInformation(information, findUser);

    if (information.comments) {
      for (const reaction of information.comments) {
        await createReaction(reaction, created, null, findUser);
      }
    }

    return created;
  }
};
