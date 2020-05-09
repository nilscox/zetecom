import React from 'react';

import moment from 'moment';
import { RouteComponentProps } from 'react-router';

import Box from 'src/components/common/Box';
import Break from 'src/components/common/Break';
import Loader from 'src/components/common/Loader';
import Text from 'src/components/common/Text';
import ReactionBody from 'src/components/reaction/ReactionBody';
import useAxios from 'src/hooks/use-axios';
import { parseReaction } from 'src/types/Reaction';
import { useTheme } from 'src/utils/Theme';

import { Paper } from '@material-ui/core';

const DATE_FORMAT = '[Le] DD.MM.YYYY [à] HH:mm';

type ReactionHistoryPopupProps = RouteComponentProps<{ id: string }>;

const ReactionHistoryPopup: React.FC<ReactionHistoryPopupProps> = ({ match }) => {
  const { sizes: { big } } = useTheme();
  const [{ data: reaction, loading, error }] = useAxios('/api/reaction/' + match.params.id, parseReaction);

  if (error)
    throw error;

  if (loading)
    return <Loader size="big" />;

  const history = [
    { date: reaction.edited, text: reaction.text },
    ...reaction.history,
  ];

  return (
    <Box
      p={4 * big}
      style={{ height: '100%', boxSizing: 'border-box' }}
      data-e2e="history-list"
    >

      { history.map(({ date, text }, n) => (
        <div key={n}>

          { n > 0 && <Break size={30} /> }

          <Text
            style={{ display: 'block' }}
            align="center"
            color="textLight"
          >
            { moment(date as Date).format(DATE_FORMAT) }
          </Text>

          <Break size={big} />

          <Paper elevation={3}>
            <ReactionBody text={text} />
          </Paper>

        </div>
      )) }

    </Box>
  );
};

export default ReactionHistoryPopup;
