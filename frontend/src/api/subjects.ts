import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useDebounce } from 'use-debounce';

import { Information } from 'src/types/Information';
import { SortType } from 'src/types/SortType';
import { Subject, parseSubject } from 'src/types/Subject';
import { Reaction, parseReaction } from 'src/types/Reaction';
import queryString from 'query-string';

import useAxios, { AxiosHook, AxiosHookAsync, useAxiosMeta, ResponseData } from './use-axios';

export const useSubjects: AxiosHook<Subject[]> = (information: Information, sort: SortType, search?: string) => {
  const [searchDebounced] = useDebounce(search, 300);
  const qs = queryString.stringify({ sort, search: searchDebounced });
  const url = `/api/information/${information.id}/subjects` + (qs ? '?' + qs : '');
  const parse = (data: ResponseData) => data.map((r: ResponseData) => parseSubject(r));

  return useAxios<Subject[]>({ url }, parse);
};

export const usePostSubject: AxiosHookAsync<Subject> = () => {
  const [meta, setMeta] = useAxiosMeta();

  const post = async (
    informationId: number,
    subject: string,
    quote: string | null,
    text: string,
  ) => {
    const payload = { informationId, subject, quote, text };

    try {
      setMeta({ loading: true });

      const { data } = await axios.post('/api/subject', payload, {
        withCredentials: true,
      });

      return parseSubject(data);
    } catch (e) {
      setMeta({ error: e });
    } finally {
      setMeta({ loading: false });
    }
  };

  return [post, meta] as const;
};

type RootReactionsExtra = {
  onCreated: (reaction: Reaction) => void;
  onEdited: (reaction: Reaction) => void;
};

export const useRootReactions: AxiosHook<Reaction[], RootReactionsExtra> = (subject: Subject, sort: SortType) => {
  const url = `/api/subject/${subject.id}/reactions` + (sort ? `?sort=${sort}` : '');
  const opts = { url, withCredentials: true };
  const parse = (data: ResponseData) => data.map((r: ResponseData) => parseReaction(r));

  const [fetched, meta] = useAxios<Reaction[]>(opts, parse);
  const [reactions, setReactions] = useState<Reaction[]>();

  useEffect(() => fetched && setReactions(fetched), [fetched, setReactions]);

  const onCreated = useCallback((reaction: Reaction) => {
    setReactions([
      reaction,
      ...reactions,
    ]);
  }, [setReactions, reactions]);

  const onEdited = useCallback((reaction: Reaction) => {
    const idx = reactions.findIndex(r => r.id === reaction.id);

    if (idx < 0)
      return;

    setReactions([
      ...reactions.slice(0, idx),
      reaction,
      ...reactions.slice(idx + 1)]);
  }, [setReactions, reactions]);

  return [
    reactions || fetched,
    meta,
    {
      onCreated,
      onEdited,
    },
  ] as const;
};
