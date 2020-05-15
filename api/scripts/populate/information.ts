import axios from 'axios';
import { plainToClass } from 'class-transformer';

import { InformationOutDto } from '../../src/modules/information/dtos/information-out.dto';

import { Information } from './dtos/Information';
import { FindUser } from './main';
import { createReaction } from './reaction';

const findInformation = async (information: Information): Promise<InformationOutDto> => {
  const { data } = await axios.get('/api/information/by-identifier/' + encodeURIComponent(information.identifier));

  return plainToClass(InformationOutDto, data);
};

const createInformation = async (information: Information, findUser: FindUser): Promise<InformationOutDto> => {
  const creator = findUser(information.creator);
  const payload = {
    identifier: information.identifier,
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

    if (information.reactions) {
      for (const reaction of information.reactions) {
        await createReaction(reaction, created, null, findUser);
      }
    }

    return created;
  }
};
