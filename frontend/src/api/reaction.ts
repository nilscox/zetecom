import { useCallback, useState } from 'react';
import axios from 'axios';
import useAxios, { AxiosHookAsync, ResponseData, AxiosHook, useAxiosMeta } from './use-axios';

import { Reaction, QuickReactionType, parseReaction } from 'src/types/Reaction';

export const useReaction: AxiosHook<Reaction> = (reactionId: string) => {
  const url = `/api/reaction/${reactionId}`;

  return useAxios<Reaction>({ url, withCredentials: true }, parseReaction);
};

type ReactionRepliesExtra= {
  replies: Reaction[];
  addReply: (reply: Reaction) => void;
  replaceReplyAt: (index: number, reply: Reaction) => void;
};

export const useReactionReplies: AxiosHookAsync<Reaction[], ReactionRepliesExtra> = (parent: Reaction) => {
  const url = `/api/reaction/${parent.id}/replies`;
  const [meta, setMeta] = useAxiosMeta();
  const [replies, setReplies] = useState<Reaction[] | undefined>();

  const fetch = useCallback(async () => {
    if (!parent)
      return;

    try {
      setMeta({ loading: true });

      const { data } = await axios(url, { withCredentials: true });
      const parsed = data.map((r: ResponseData) => parseReaction(r));

      setReplies(parsed);

      return parsed;
    } catch (e) {
      setMeta({ error: e });
    } finally {
      setMeta({ loading: false });
    }
  }, [parent, url, setReplies, setMeta]);

  const addReply = useCallback((reply: Reaction) => {
    setReplies([reply, ...replies]);
  }, [setReplies, replies]);

  const replaceReplyAt = useCallback((index: number, reply: Reaction) => {
    setReplies([
      ...replies.slice(0, index),
      reply,
      ...replies.slice(index + 1)]);
  }, [setReplies, replies]);

  return [
    fetch,
    meta,
    {
      replies,
      addReply,
      replaceReplyAt,
    },
  ] as const;
};

export const usePostReaction: AxiosHookAsync<Reaction> = () => {
  const [meta, setMeta] = useAxiosMeta();

  const post = async (subjectId: number, text: string, parentId?: number) => {
    const payload = { subjectId, text, parentId };

    try {
      setMeta({ loading: true });

      const { data } = await axios.post('/api/reaction', payload, { withCredentials: true });

      return parseReaction(data);
    } catch (e) {
      setMeta({ error: e });
    } finally {
      setMeta({ loading: false });
    }
  };

  return [post, meta] as const;
};

export const useUpdateReaction: AxiosHookAsync<Reaction> = () => {
  const [meta, setMeta] = useAxiosMeta();

  const post = async (reactionId: number, text: string) => {
    const payload = { text };

    try {
      setMeta({ loading: true });

      const { data } = await axios.put(`/api/reaction/${reactionId}`, payload, { withCredentials: true });

      return parseReaction(data);
    } catch (e) {
      setMeta({ error: e });
    } finally {
      setMeta({ loading: false });
    }
  };

  return [post, meta] as const;
};

export const usePostQuickReaction: AxiosHookAsync<Reaction> = () => {
  const [meta, setMeta] = useAxiosMeta();

  const post = async (reactionId: number, type: QuickReactionType) => {
    const payload = { type: type ? type.toUpperCase() : null };

    try {
      setMeta({ loading: true });

      const { data } = await axios.post(`/api/reaction/${reactionId}/quick-reaction`, payload, {
        withCredentials: true,
      });

      return parseReaction(data);
    } catch (e) {
      setMeta({ error: e });
    } finally {
      setMeta({ loading: false });
    }
  };

  return [post, meta] as const;
};

export const useReportReaction: AxiosHookAsync<void> = (reactionId: number, type: string, message?: string) => {
  const [meta, setMeta] = useAxiosMeta();

  const report = async (reactionId: number, type: QuickReactionType) => {
    const payload = { type, message };

    try {
      setMeta({ loading: true });

      await axios.post(`/api/reaction/${reactionId}/report`, payload, {
        withCredentials: true,
      });
    } catch (e) {
      setMeta({ error: e });
    } finally {
      setMeta({ loading: false });
    }
  };

  return [report, meta] as const;
};
