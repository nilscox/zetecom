import React from 'react';

import moment from 'moment';
import { RouteComponentProps } from 'react-router';

import Box from 'src/components/common/Box';
import Break from 'src/components/common/Break';
import Flex from 'src/components/common/Flex';
import Loader from 'src/components/common/Loader';
import Text from 'src/components/common/Text';
import ReactionBody from 'src/components/reaction/ReactionBody';
import useAxios from 'src/hooks/use-axios';
import { parseReaction } from 'src/types/Reaction';
import { useTheme } from 'src/utils/Theme';

const DATE_FORMAT = '[Le] DD.MM.YYYY [à] hh:mm';

type ReactionHistoryPopupProps = RouteComponentProps<{ id: string }>;

const ReactionHistoryPopup: React.FC<ReactionHistoryPopupProps> = ({ match }) => {
  const { colors: { border }, sizes: { big } } = useTheme();
  const [{ data: reaction, loading, error }] = useAxios('/api/reaction/' + match.params.id, parseReaction);

  if (error)
    throw error;

  if (loading)
    return <Loader size="big" />;

  const history = [
    { date: reaction.edited, text: reaction.text },
    ...reaction.history.reverse(),
  ];

  return (
    <Box
      p={4 * big}
      style={{ height: '100%', boxSizing: 'border-box' }}
    >

      { history.map(({ date, text }, n) => (
        <div key={n}>

          { n > 0 && <Break size={30} /> }

          <Flex flexDirection="row" alignItems="center">
            <Flex mr={big} flex={1} border={`3px solid ${border}`} />
            <Text color="textLight">{ moment(date as Date).format(DATE_FORMAT) }</Text>
            <Flex ml={big} flex={1} border={`3px solid ${border}`} />
          </Flex>

          <Break size={big} />

          <ReactionBody text={text} />

        </div>
      )) }

    </Box>
  );
};

export default ReactionHistoryPopup;
