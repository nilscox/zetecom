import React, { useState } from 'react';

import dayjs from 'dayjs';
import * as diff from 'diff';
import { RouteComponentProps } from 'react-router';

import Box from 'src/components/Box';
import Break from 'src/components/Break';
import DiffMessage from 'src/components/DiffMessage';
import Loader from 'src/components/Loader';
import Text from 'src/components/Text';
import { useTrackPageview } from 'src/components/TrackPageView';
import useAxios from 'src/hooks/use-axios';
import { useTheme } from 'src/theme/Theme';
import { parseComment } from 'src/types/Comment';

import { Paper } from '@material-ui/core';
import { parseMessage } from '../../../types/Comment';

const DATE_FORMAT = '[Le] DD.MM.YYYY [à] HH:mm';

const useDiff = (messages: string[], mouseOver?: number) => {
  const diffFunc = diff.diffLines;

  const makeDiff = (a: string, b: string) => {
    const result = diffFunc(a, b);
    const [before, after]: Diff.Change[][] = [[], []];

    for (const { value, added, removed } of result) {
      if (added)
        after.push({ value, added: true });
      else if (removed)
        before.push({ value, removed: true });
      else {
        after.push({ value });
        before.push({ value });
      }
    }

    return [before, after];
  };

  return (n: number): Diff.Change[] => {
    const noChange = [{ value: messages[n] }];

    if (mouseOver !== undefined) {
      if (mouseOver === messages.length - 1 || (n !== mouseOver && n !== mouseOver + 1))
        return noChange;

      const [before, after] = makeDiff(messages[mouseOver], messages[mouseOver + 1]);

      if (n === mouseOver)
        return before;
      else if (n === mouseOver + 1)
        return after;

      return noChange;
    }

    if (n === messages.length - 1)
      return noChange;

    return diffFunc(messages[n], messages[n + 1]);
  };
};

type DiffMessagesProps = {
  messages: { date: Date | false; text: string }[];
};

const DiffMessages: React.FC<DiffMessagesProps> = ({ messages }) => {
  const { sizes: { big } } = useTheme();
  const [mouseOver, setMouseOver] = useState<number>();
  const getDiff = useDiff(messages.map(message => message.text), mouseOver);

  return (
    <>
      { messages.map(({ date }, n) => (
        <div
          key={n}
          style={{
            transition: 'opacity 300ms ease-in-out',
            ...(mouseOver !== undefined && n !== mouseOver && n !== mouseOver + 1 && {
              opacity: 0.5,
            }),
          }}
          onMouseEnter={() => setMouseOver(n)}
          onMouseLeave={() => setMouseOver(undefined)}
        >

          { n > 0 && <Break size={30} /> }

          <Text
            style={{ display: 'block' }}
            align="center"
            color="textLight"
          >
            { dayjs(date as Date).format(DATE_FORMAT) }
          </Text>

          <Break size={big} />

          <Paper elevation={3} style={{ background: 'transparent' }}>
            <DiffMessage diff={getDiff(n)} />
          </Paper>

        </div>
      )) }
    </>
  );
};

type CommentHistoryPopupProps = RouteComponentProps<{ id: string }>;

const CommentHistoryPopup: React.FC<CommentHistoryPopupProps> = ({ match }) => {
  useTrackPageview();

  const { sizes: { big } } = useTheme();
  const parseMessages = (data: any[]) => data.map(parseMessage);
  const [{ data: history, loading, error }] = useAxios('/api/comment/' + match.params.id + '/history', parseMessages);

  if (error)
    throw error;

  if (loading)
    return <Loader size="big" />;

  return (
    <Box
      p={4 * big}
      style={{ height: '100%', boxSizing: 'border-box' }}
      data-e2e="history-list"
    >

      <DiffMessages messages={history} />

    </Box>
  );
};

export default CommentHistoryPopup;
