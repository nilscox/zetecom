import React, { useState } from 'react';

import { Box, Paper, Typography } from '@material-ui/core';
import { plainToClass } from 'class-transformer';
import dayjs from 'dayjs';
import * as diff from 'diff';
import { RouteComponentProps } from 'react-router';

import DiffMessage from 'src/components/DiffMessage';
import Loader from 'src/components/Loader';
import useAxios from 'src/hooks/use-axios';
import { Message } from 'src/types/Comment';

const DATE_FORMAT = '[Le] DD.MM.YYYY [à] HH:mm';

const useDiff = (messages: string[], mouseOver?: number) => {
  const diffFunc = diff.diffLines;

  const makeDiff = (a: string, b: string) => {
    const result = diffFunc(a, b);
    const [before, after]: Diff.Change[][] = [[], []];

    for (const { value, added, removed } of result) {
      if (added) {
        after.push({ value, added: true });
      } else if (removed) {
        before.push({ value, removed: true });
      } else {
        after.push({ value });
        before.push({ value });
      }
    }

    return [before, after];
  };

  return (n: number): Diff.Change[] => {
    const noChange = [{ value: messages[n] }];

    if (mouseOver !== undefined) {
      if (mouseOver === messages.length - 1 || (n !== mouseOver && n !== mouseOver + 1)) {
        return noChange;
      }

      const [before, after] = makeDiff(messages[mouseOver], messages[mouseOver + 1]);

      if (n === mouseOver) {
        return before;
      } else if (n === mouseOver + 1) {
        return after;
      }

      return noChange;
    }

    if (n === messages.length - 1) {
      return noChange;
    }

    return diffFunc(messages[n], messages[n + 1]);
  };
};

type DiffMessagesProps = {
  messages: { date: Date | false; text: string }[];
};

const DiffMessages: React.FC<DiffMessagesProps> = ({ messages }) => {
  const [mouseOver, setMouseOver] = useState<number>();
  const getDiff = useDiff(
    messages.map(message => message.text),
    mouseOver,
  );

  return (
    <>
      {messages.map(({ date }, n) => (
        <div
          key={n}
          style={{
            transition: 'opacity 300ms ease-in-out',
            ...(mouseOver !== undefined &&
              n !== mouseOver &&
              n !== mouseOver + 1 && {
                opacity: 0.5,
              }),
          }}
          onMouseEnter={() => setMouseOver(n)}
          onMouseLeave={() => setMouseOver(undefined)}
        >
          {n > 0 && <div style={{ minHeight: 30 }} />}

          <Typography component="div" align="center" color="textSecondary">
            {dayjs(date as Date).format(DATE_FORMAT)}
          </Typography>

          <div style={{ minHeight: 10 }} />

          <Paper elevation={3} style={{ background: 'transparent' }}>
            <DiffMessage diff={getDiff(n)} />
          </Paper>
        </div>
      ))}
    </>
  );
};

type CommentHistoryPopupProps = RouteComponentProps<{ id: string }>;

const CommentHistoryPopup: React.FC<CommentHistoryPopupProps> = ({ match }) => {
  const [{ raw, loading, error }] = useAxios('/api/comment/' + match.params.id + '/history', undefined);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const history = raw?.map((data: any) => plainToClass(Message, data));

  if (error) {
    throw error;
  }

  // TODO: use <AsyncContent />
  if (loading) {
    return <Loader size="big" />;
  }

  return (
    <Box p={40} style={{ height: '100%', boxSizing: 'border-box' }} data-e2e="history-list">
      <DiffMessages messages={history} />
    </Box>
  );
};

export default CommentHistoryPopup;
