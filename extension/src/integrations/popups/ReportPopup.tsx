import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';

import { useTheme } from 'src/utils/Theme';

import Break from 'src/components/common/Break';
import Collapse from 'src/components/common/Collapse';
import Button, { ButtonProps } from 'src/components/common/Button';
import Loader from 'src/components/common/Loader';
import Flex from 'src/components/common/Flex';
import Box from 'src/components/common/Box';
import Text from 'src/components/common/Text';
import TextArea from 'src/components/common/TextArea';
import Select from 'src/components/common/Select';

import ReactionBody from 'src/components/reaction/ReactionBody';
import useAxios from 'src/hooks/use-axios';
import { parseReaction } from 'src/types/Reaction';

const POPUP_CLOSE_AFTER_SUCCESS_TIMEOUT = 3000;

const ReportButton: React.FC<ButtonProps> = (props) => {
  const { colors: { textLight, textWarning } } = useTheme();
  const [hover, setHover] = useState(false);

  return (
    <Button
      size="big"
      text={{
        style: {
          color: hover ? textWarning : textLight,
          transition: 'color 160ms ease',
        },
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      Signaler
    </Button>
  );
};

const ReportSuccess: React.FC = () => {
  const { sizes: { big } } = useTheme();

  return (
    <div
      style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
    >
      <Flex
        p={12 * big}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        style={{ height: '100%', boxSizing: 'border-box' }}
      >
        <Text
          uppercase
          color="textLight"
          align="center"
        >
          La réaction a été signalée, merci pour votre contribution ! 💪
        </Text>
      </Flex>
    </div>
  );
};

type ReportPopupProps = RouteComponentProps<{ id: string }>;

const ReportPopup: React.FC<ReportPopupProps> = ({ match }) => {
  const [reportType, setReportType] = useState('MISINFORMATION');
  const [message, setMessage] = useState('');
  const [displayMessage, setDisplayMessage] = useState(false);
  const [success, setSuccess] = useState(false);
  const { colors: { border }, sizes: { big }, borderRadius } = useTheme();

  const [{ data: reaction, loading, error }] = useAxios('/api/reaction/' + match.params.id, parseReaction);

  const [{
    loading: reportLoading,
    error: reportError,
    status,
  }, report] = useAxios({ method: 'POST' }, () => undefined, { manual: true });

  if (error)
    throw error;

  if (reportError)
    throw reportError;

  useEffect(() => {
    if (status(201)) {
      setSuccess(true);
      setTimeout(window.close, POPUP_CLOSE_AFTER_SUCCESS_TIMEOUT);
    }
  }, [status, setSuccess]);

  const onSubmit = async () => {
    if (reaction) {
      report({
        url: `/api/reaction/${reaction.id}/report`,
        data: {
          reactionId: reaction.id,
          type: reportType,
          message: message !== '' ? message : undefined,
        },
      });
    }
  };

  const onReportTypeChange = (type: string) => {
    setReportType(type);
    setDisplayMessage(type === 'OTHER');
  };

  if (loading)
    return <Loader size="big" />;

  if (success)
    return <ReportSuccess />;

  return (
    <Box
      p={4 * big}
      style={{ height: '100%', boxSizing: 'border-box' }}
    >

      <Text variant="subtitle">
        Signaler la réaction de <Text bold>{reaction.author.nick}</Text>
      </Text>

      <Break size={30} />

      <Text bold color="textWarning">
        Attention ! Vous êtes sur le point de signaler une réaction.<br />
        TODO: *rappel des motifs de de signalement*
      </Text>

      <Break size={30} />

      <Box
        p={big}
        border={`1px solid ${border}`}
        borderRadius={borderRadius}
        style={{ width: '100%', boxSizing: 'border-box' }}
      >
        <ReactionBody text={reaction.text} />
      </Box>

      <Break size={30} />

      <Flex flexDirection="row" style={{ alignSelf: 'flex-start' }}>
        <Text bold>Motif du signalement :&nbsp;</Text>
        <Select
          values={{
            MISINFORMATION: 'Désinformation',
            RULES_VIOLATION: 'Non respect des règles',
            OTHER: 'Autre motif...',
          }}
          value={reportType}
          onChange={(e) => onReportTypeChange(e.currentTarget.value)}
        />
      </Flex>

      <Collapse open={displayMessage} style={{ width: '100%' }}>

        <Break size={30} />

        <TextArea
          fullWidth
          rows={4}
          placeholder="Expliquez en quelques mots le motif du signalement..."
          style={{ resize: 'vertical' }}
          onChange={e => setMessage(e.currentTarget.value)}
        />

      </Collapse>

      <Flex mt={4 * big} flexDirection="row" justifyContent="center">
        <ReportButton loading={reportLoading} onClick={onSubmit} />
      </Flex>

    </Box>
  );
};

export default ReportPopup;
