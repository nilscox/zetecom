/* eslint-disable max-lines */

import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { AxiosRequestConfig } from 'axios';

import { Reaction, parseReaction } from 'src/types/Reaction';
import env from 'src/utils/env';
import { useTheme } from 'src/utils/Theme';
import Flex from 'src/components/common/Flex';
import Loader from 'src/components/common/Loader';
import Collapse from 'src/components/common/Collapse';
import useAxios from 'src/hooks/use-axios';
import { usePaginatedResults, Paginated } from 'src/utils/parse-paginated';
import useEditableDataset from 'src/hooks/use-editable-dataset';
import useUpdateEffect from 'src/hooks/use-update-effect';

import ReactionComponent from './Reaction';
import ReactionsList from './ReactionsList';
import ReactionForm, { ReactionEditionForm } from './ReactionForm';

export const useReactionReplies = (parent: Reaction) => {
  const [page, setPage] = useState(0);

  const url = `/api/reaction/${parent.id}/replies`;
  const parse = useCallback(usePaginatedResults(parseReaction), []);
  const [{ data, loading, error }, fetch] = useAxios<Paginated<Reaction>>(
    url,
    parse,
    { manual: true },
  );

  const [replies, { prepend, replace }] = useEditableDataset(data ? data.items : null, { appendOnUpdate: true });

  useUpdateEffect(() => {
    const opts: AxiosRequestConfig = { params: {} };

    if (page !== 1)
      opts.params.page = page;

    if (parent)
      fetch(opts);
  }, [page]);

  return [
    {
      replies,
      total: data ? data.total : undefined,
      loading,
      error,
    },
    {
      fetchMoreReplies: () => setPage(page + 1),
      addReply: prepend,
      replaceReply: replace,
    },
  ] as const;
};

const useReport = (reaction: Reaction) => {
  const reportUrl = `${env.EXTENSION_URL}/integration/reaction/${reaction.id}/report`;

  const report = () => {
    window.open(reportUrl, '_blank', 'width=600,height=800,resizable=no');
  };

  return report;
};

const useViewHistory = (reaction: Reaction) => {
  const historyUrl = `${env.EXTENSION_URL}/integration/reaction/${reaction.id}/history`;

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

type FetchMoreRepliesProps = {
  remainingReplies: number;
  fetchMoreReplies: () => void;
};

const FetchMoreReplies: React.FC<FetchMoreRepliesProps> = ({ remainingReplies, fetchMoreReplies }) => {
  const s = remainingReplies > 1 ? 's' : '';

  return (
    <Flex
      justifyContent="center"
      onClick={fetchMoreReplies}
      style={{ color: '#666', marginTop: 4, cursor: 'pointer' }}
    >
      ▾ &nbsp; { remainingReplies } réaction{s} restante{s} &nbsp; ▾
    </Flex>
  );
};

type ReactionContainerProps = {
  reaction: Reaction;
  onEdited?: (reaction: Reaction) => void;
};

const ReactionContainer: React.FC<ReactionContainerProps> = ({ reaction: originalReaction, onEdited }) => {
  const [displayReplies, setDisplayReplies] = useState(false);
  const [displayReplyForm, setDisplayReplyForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [reaction, setReaction] = useState(originalReaction);

  const [
    { replies, total: totalReplies, loading, error },
    { fetchMoreReplies, addReply, replaceReply },
  ] = useReactionReplies(reaction);

  if (error)
    throw error;

  const remainingReplies = useMemo(() => {
    if (!replies || typeof replies.length !== 'number')
      return;

    return totalReplies - replies.length;
  }, [replies, totalReplies]);

  const report = useReport(reaction);
  const viewHistory = useViewHistory(reaction);

  const [showReplyForm, hideReplyForm] = [true, false].map(v => () => setDisplayReplyForm(v));
  const [edit, closeEditionForm] = [true, false].map(v => () => setEditing(v));

  const toggleReplies = useCallback(() => {
    if (!replies && !error)
      fetchMoreReplies();

    setDisplayReplies(!displayReplies);
  }, [replies, error, fetchMoreReplies, setDisplayReplies, displayReplies]);

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

    replaceReply(reply);
  };

  const onReactionEdited = (reaction: Reaction) => {
    onEdited(reaction);
    closeEditionForm();
  };

  useEffect(() => void setReaction(originalReaction), [originalReaction]);

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
          onEdit={onEdited ? edit : undefined}
          onViewHistory={viewHistory}
          onReport={report}
        />
      ) }

      <Collapse open={displayReplyForm}>
        <Indented>
          <ReactionForm
            parent={reaction}
            closeForm={hideReplyForm}
            onCreated={onCreated}
          />
        </Indented>
      </Collapse>

      <Collapse open={displayReplies}>
        <Indented>
          <ReactionsList
            reactions={replies || []}
            onEdited={onReplyEdited}
          />
          { remainingReplies > 0 && !loading && (
            <FetchMoreReplies
              remainingReplies={remainingReplies}
              fetchMoreReplies={fetchMoreReplies}
            />
          ) }
          { loading && <Loader /> }
        </Indented>
      </Collapse>

    </>
  );
};

export default ReactionContainer;
