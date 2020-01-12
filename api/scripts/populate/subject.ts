import axios from 'axios';
import { plainToClass } from 'class-transformer';

import { SubjectOutDto } from '../../src/modules/subject/dtos/subject-out.dto';
import { InformationOutDto } from '../../src/modules/information/dtos/information-out.dto';

import { FindUser } from './main';
import { Subject } from './dtos/Subject';
import { createReaction } from './reaction';

export const createSubject = async (subject: Subject, information: InformationOutDto, findUser: FindUser): Promise<SubjectOutDto> => {
  const author = findUser(subject.author);
  const payload = {
    informationId: information.id,
    subject: subject.subject,
    text: subject.text,
    quote: subject.quote,
  };

  const { data } = await axios.post('/api/subject', payload, {
    headers: { cookie: author.cookie },
  });

  const created = plainToClass(SubjectOutDto, data);

  if (subject.reactions)
    await Promise.all(subject.reactions.map(r => createReaction(r, information, created, null, findUser)));

  return created;
};
