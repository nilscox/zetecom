import React, { useCallback, useEffect, useState } from 'react';

import { Subject } from 'src/types/Subject';
import { Reaction, parseReaction } from 'src/types/Reaction';
import env from 'src/utils/env';
import { useTheme } from 'src/utils/Theme';
import Flex from 'src/components/common/Flex';
import Loader from 'src/components/common/Loader';
import Collapse from 'src/components/common/Collapse';

import useAxios from 'src/hooks/use-axios';

import ReactionComponent from './Reaction';
import ReactionsList from './ReactionsList';
import ReactionForm, { ReactionEditionForm } from './ReactionForm';

export const useReactionReplies = (parent: Reaction) => {
  const [replies, setReplies] = useState<Reaction[] | undefined>();

  const url = `/api/reaction/${parent.id}/replies`;
  const parse = useCallback((data: any) => data.map(parseReaction), []);
  const [{ data, loading, error }, fetch] = useAxios(url, parse, { manual: true });

  useEffect(() => {
    if (data)
      setReplies(data);
  }, [data]);

  const fetchReplies = () => {
    if (parent)
      fetch();
  };

  const addReply = (reply: Reaction) => setReplies([reply, ...replies]);

  const replaceReplyAt = (index: number, reply: Reaction) => {
    setReplies([
      ...replies.slice(0, index),
      reply,
      ...replies.slice(index + 1)]);
  };

  return [
    { replies, loading, error },
    { fetchReplies, replies, addReply, replaceReplyAt },
  ] as const;
};

const useReport = (reaction: Reaction) => {
  const reportUrl = `${env.BASE_URL}/integration/reaction/${reaction.id}/report`;

  const report = () => {
    window.open(reportUrl, '_blank', 'width=600,height=800,resizable=no');
  };

  return report;
};

const useViewHistory = (reaction: Reaction) => {
  const historyUrl = `${env.BASE_URL}/integration/reaction/${reaction.id}/history`;

  const viewHistory = () => {
    window.open(historyUrl, '_blank', 'width=600,height=800,resizable=no');
  };

  return viewHistory;
};

const Indented: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { sizes: { big }, colors: { border } } = useTheme();

  return (
    <Flex flexDirection="row" pt={big}>
      <div style={{ borderLeft: `6px solid ${border}`, paddingLeft: big + 2 }} />
      <div style={{ flex: 1 }}>
        { children }
      </div>
    </Flex>
  );
};

type ReactionContainerProps = {
  subject: Subject;
  reaction: Reaction;
  onEdited: (reaction: Reaction) => void;
};

const ReactionContainer: React.FC<ReactionContainerProps> = ({ subject, reaction: originalReaction, onEdited }) => {
  const [displayReplies, setDisplayReplies] = useState(false);
  const [displayReplyForm, setDisplayReplyForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [reaction, setReaction] = useState(originalReaction);

  const [
    { replies, loading, error },
    { fetchReplies, addReply, replaceReplyAt },
  ] = useReactionReplies(reaction);

  if (error)
    throw error;

  const report = useReport(reaction);
  const viewHistory = useViewHistory(reaction);

  const [showReplyForm, hideReplyForm] = [true, false].map(v => () => setDisplayReplyForm(v));
  const [edit, closeEditionForm] = [true, false].map(v => () => setEditing(v));

  const toggleReplies = useCallback(() => {
    if (!replies && !error)
      fetchReplies();

    setDisplayReplies(!displayReplies);
  }, [replies, error, fetchReplies, setDisplayReplies, displayReplies]);

  const onCreated = (created: Reaction) => {
    addReply(created);
    hideReplyForm();
    setReaction({
      ...reaction,
      repliesCount: reaction.repliesCount + 1,
    });
  };

  const onReplyEdited = (reply: Reaction) => {
    if (!replies)
      return;

    const idx = replies.findIndex(r => r.id === reply.id);

    if (idx < 0)
      return;

    replaceReplyAt(idx, reply);
  };

  const onReactionEdited = (reaction: Reaction) => {
    onEdited(reaction);
    closeEditionForm();
  };

  useEffect(() => {
    if (displayReplyForm && !displayReplies) {
      const timeout = setTimeout(toggleReplies, 100);
      return () => clearTimeout(timeout);
    }
  }, [displayReplyForm, displayReplies, toggleReplies]);

  return (
    <>

      { editing ? (
        <ReactionEditionForm
          reaction={reaction}
          onEdited={onReactionEdited}
          closeForm={closeEditionForm}
        />
      ) : (
        <ReactionComponent
          reaction={reaction}
          displayReplies={displayReplies}
          toggleReplies={!displayReplyForm ? toggleReplies : null}
          displayReplyForm={displayReplyForm}
          onReply={showReplyForm}
          onEdit={edit}
          onViewHistory={viewHistory}
          onReport={report}
        />
      ) }

      <Collapse open={displayReplyForm}>
        <Indented>
          <ReactionForm
            subject={subject}
            parent={reaction}
            closeForm={hideReplyForm}
            onCreated={onCreated}
          />
        </Indented>
      </Collapse>

      <Collapse open={displayReplies}>
        <Indented>
          { loading ? (
            <Loader />
          ) : (
            <ReactionsList
              subject={subject}
              reactions={replies || []}
              onEdited={onReplyEdited}
            />
          ) }
        </Indented>
      </Collapse>

    </>
  );
};

export default ReactionContainer;
