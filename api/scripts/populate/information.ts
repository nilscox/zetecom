import axios from 'axios';

import { InformationOutDto } from '../../src/modules/information/dtos/information-out.dto';

import { FindUser } from './main';
import { Information } from './dtos/Information';
import { plainToClass } from 'class-transformer';
import { createSubject } from './subject';
import { createReaction } from './reaction';

const findInformation = async (information: Information): Promise<InformationOutDto> => {
  const { data } = await axios.get('/api/information/by-url/' + encodeURIComponent(information.url));

  return plainToClass(InformationOutDto, data);
};

const createInformation = async (information: Information, findUser: FindUser): Promise<InformationOutDto> => {
  const creator = findUser(information.creator);
  const payload = {
    url: information.url,
    title: information.title,
  };

  const { data } = await axios.post('/api/information', payload, {
    headers: { cookie: creator.cookie },
  });

  return plainToClass(InformationOutDto, data);
};

export const findOrCreateInformation = async (information: Information, findUser: FindUser): Promise<InformationOutDto> => {
  try {
    return await findInformation(information);
  } catch (e) {
    if (!e.response || e.response.status !== 404)
      throw e;

    const created = await createInformation(information, findUser);

    if (information.subjects)
      await Promise.all(information.subjects.map(s => createSubject(s, created, findUser)));

    if (information.reactions)
      await Promise.all(information.reactions.map(r => createReaction(r, created, null, null, findUser)));

    return created;
  }
};
