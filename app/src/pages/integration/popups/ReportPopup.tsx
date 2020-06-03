/* eslint-disable max-lines */

import React, { useEffect, useState } from 'react';

import { RouteComponentProps } from 'react-router';

import Box from 'src/components/Box';
import Break from 'src/components/Break';
import Button, { ButtonProps } from 'src/components/Button';
import Flex from 'src/components/Flex';
import Loader from 'src/components/Loader';
import ReactionBody from 'src/components/Reaction/ReactionBody';
import Text from 'src/components/Text';
import TextArea from 'src/components/TextArea';
import useAxios from 'src/hooks/use-axios';
import WebsiteLink from 'src/popup/components/WebsiteLink';
import { useTheme } from 'src/theme/Theme';
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
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [alreadyReported, setArleadyReported] = useState(false);
  const { colors: { border }, sizes: { big }, borderRadius } = useTheme();

  const [{ data: reaction, loading, error }] = useAxios('/api/reaction/' + match.params.id, parseReaction);

  const requestConfig = { method: 'POST', validateStatus: (status: number) => [201, 400].includes(status) } as const;
  const [{
    loading: reportLoading,
    error: reportError,
    raw: rawReportData,
    status,
  }, report] = useAxios(requestConfig, () => undefined, { manual: true });

  if (error)
    throw error;

  if (reportError)
    throw reportError;

  useEffect(() => {
    if (status(400)) {
      if (rawReportData && rawReportData.message === 'REACTION_ALREADY_REPORTED')
        setArleadyReported(true);
      else
        throw error;
    }
  }, [status, setArleadyReported, error, rawReportData]);

  useEffect(() => {
    if (status(201)) {
      setSuccess(true);
      setTimeout(window.close, POPUP_CLOSE_AFTER_SUCCESS_TIMEOUT);
    }
  }, [status, setSuccess]);

  const onSubmit = () => {
    if (reaction) {
      report({
        url: `/api/reaction/${reaction.id}/report`,
        data: {
          reactionId: reaction.id,
          message: message !== '' ? message : undefined,
        },
      });
    }
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

      <Break size={10} />

      <Text bold color="textWarning">
        <p style={{ margin: `${big}px 0` }}>
          Attention ! Vous êtes sur le point de signaler une réaction.
        </p>
        <p style={{ margin: `${big}px 0` }}>
          Cette démarche doit être faite si la réaction déroge à une ou plusieurs règle(s) de{' '}
          <WebsiteLink to="/charte.html">la charte</WebsiteLink>. Le fait que vous ne soyez pas d'accord avec les propos
          tenus dans ce message n'est pas un motif valable pour la signaler.
        </p>
        <p style={{ margin: `${big}px 0` }}>
          En revanche, abuser de la fonction de signalement de manière répété et sans raison valable peut entrainer une
          suspension de votre compte.
        </p>
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

      <TextArea
        fullWidth
        rows={4}
        placeholder="Précisez en quelques mots le motif du signalement si nécessaire..."
        style={{ resize: 'vertical' }}
        onChange={e => setMessage(e.currentTarget.value)}
      />

      { alreadyReported && (
        <Box mt={30} style={{ textAlign: 'center' }}>
          <Text bold color="textWarning" >Vous avez déjà signalé cette réaction</Text>
        </Box>
      ) }

      <Flex mt={4 * big} flexDirection="row" justifyContent="center">
        <ReportButton loading={reportLoading} onClick={onSubmit} />
      </Flex>

    </Box>
  );
};

export default ReportPopup;
