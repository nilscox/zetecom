import axios from 'axios';

import { SortType } from 'src/types/SortType';
import { Subject, parseSubject } from 'src/types/Subject';
import { Reaction, parseReaction } from 'src/types/Reaction';
import queryString from 'query-string';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ResponseData = any;

export const fetchSubjects = async (informationId: number, sort?: SortType, search?: string): Promise<Subject[]> => {
  const qs = queryString.stringify({
    sort: sort && sort.length ? sort : undefined,
    search: search && search.length ? search : undefined,
  });

  const { data } = await axios.get(`/api/information/${informationId}/subjects${ qs ? '?' + qs : '' }`, {
    withCredentials: true,
  });

  return data.map((r: ResponseData) => parseSubject(r));
};

export const fetchReactions = async (subjectId: number, sort?: SortType): Promise<Reaction[]> => {
  const { data } = await axios.get(`/api/subject/${subjectId}/reactions${sort ? `?sort=${sort}` : '' }`, {
    withCredentials: true,
  });

  return data.map((r: ResponseData) => parseReaction(r));
};

export const postSubject = async (
  informationId: number,
  subject: string,
  quote: string | null,
  text: string,
): Promise<Subject> => {
  const payload = { informationId, subject, quote, text };

  const { data } = await axios.post('/api/subject', payload, {
    withCredentials: true,
  });

  return parseSubject(data);
};
