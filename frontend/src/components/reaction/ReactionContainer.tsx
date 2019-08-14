import React, { useCallback, useEffect, useState } from 'react';

import { Subject } from 'src/types/Subject';
import { Reaction } from 'src/types/Reaction';
import env from 'src/utils/env';
import { fetchReplies } from 'src/api/reaction';
import { useTheme } from 'src/utils/Theme';
import Flex from 'src/components/common/Flex';
import Loader from 'src/components/common/Loader';
import Collapse from 'src/components/common/Collapse';

import ReactionComponent from './Reaction';
import ReactionsList from './ReactionsList';
import ReactionForm, { ReactionEditionForm } from './ReactionForm';

const useReplies = (parent?: Reaction) => {
  const [replies, setReplies] = useState<Reaction[] | undefined>();
  const [fetching, setFetching] = useState(true);

  const onFetchReplies = useCallback(async () => {
    if (!parent)
      return;

    setFetching(true);

    try {
      setReplies(await fetchReplies(parent.id));
    } catch (e) {
      console.error(e);
    } finally {
      setFetching(false);
    }

  }, [parent, setReplies, setFetching]);

  const addReply = useCallback((reply: Reaction) => {
    setReplies([reply, ...replies]);
  }, [setReplies, replies]);

  const replaceReplyAt = useCallback((index: number, reply: Reaction) => {
    setReplies([
      ...replies.slice(0, index),
      reply,
      ...replies.slice(index + 1)]);
  }, [setReplies, replies]);

  return {
    fetchingReplies: fetching,
    replies,
    fetchReplies: onFetchReplies,
    addReply,
    replaceReplyAt,
  };
};

const useReport = (reaction: Reaction) => {
  const reportUrl = `${env.BASE_URL}/integration/reaction/${reaction.id}/report`;

  const report = useCallback(() => {
    window.open(reportUrl, '_blank', 'width=600,height=800,resizable=no');
  }, [reaction.id]);

  return report;
};

const useViewHistory = (reaction: Reaction) => {
  const historyUrl = `${env.BASE_URL}/integration/reaction/${reaction.id}/history`;

  const viewHistory = useCallback(() => {
    window.open(historyUrl, '_blank', 'width=600,height=800,resizable=no');
  }, [reaction.id]);

  return viewHistory;
};

const Indented: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { sizes: { big }, colors: { border } } = useTheme();

  return (
    <Flex flexDirection="row" pt={big}>
      <div style={{ borderLeft: `8px solid ${border}`, paddingLeft: big }} />
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

const ReactionContainer: React.FC<ReactionContainerProps> = ({ subject, reaction, onEdited }) => {
  const [displayReplies, setDisplayReplies] = useState(false);
  const [displayReplyForm, setDisplayReplyForm] = useState(false);
  const { fetchingReplies, replies, fetchReplies, addReply, replaceReplyAt } = useReplies(reaction);
  const report = useReport(reaction);
  const viewHistory = useViewHistory(reaction);
  const [editing, setEditing] = useState(false);

  const [showReplyForm, hideReplyForm] = [true, false].map(v => () => setDisplayReplyForm(v));
  const [edit, closeEditionForm] = [true, false].map(v => () => setEditing(v));

  const toggleReplies = useCallback(() => {
    if (!replies)
      fetchReplies();

    setDisplayReplies(!displayReplies);
  }, [replies, fetchReplies, setDisplayReplies, displayReplies]);

  const onCreated = useCallback((reaction: Reaction) => {
    addReply(reaction);
    hideReplyForm();
  }, [addReply, hideReplyForm]);

  const onReplyEdited = useCallback((reply: Reaction) => {
    if (!replies)
      return;

    const idx = replies.findIndex(r => r.id === reply.id);

    if (idx < 0)
      return;

    replaceReplyAt(idx, reply);
  }, [replies, replaceReplyAt]);

  const onReactionEdited = useCallback((reaction: Reaction) => {
    onEdited(reaction);
    closeEditionForm();
  }, [onEdited]);

  useEffect(() => {
    if (displayReplyForm && !displayReplies)
      setTimeout(toggleReplies, 100);
  }, [displayReplyForm, displayReplies, setDisplayReplies]);

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
          { fetchingReplies ? (
            <Loader />
          ) : (
            <ReactionsList
              subject={subject}
              reactions={replies}
              onEdited={onReplyEdited}
            />
          ) }
        </Indented>
      </Collapse>

    </>
  );
};

export default ReactionContainer;
