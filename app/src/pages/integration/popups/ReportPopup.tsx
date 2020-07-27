/* eslint-disable max-lines */

import React, { useEffect, useState } from 'react';

import { RouteComponentProps } from 'react-router';

import Box from 'src/components/Box';
import Break from 'src/components/Break';
import Button, { ButtonProps } from 'src/components/Button';
import Flex from 'src/components/Flex';
import { WebsiteLink } from 'src/components/Link';
import Loader from 'src/components/Loader';
import CommentBody from 'src/components/Comment/CommentBody';
import Text from 'src/components/Text';
import TextArea from 'src/components/TextArea';
import { useTrackPageview } from 'src/components/TrackPageView';
import useAxios from 'src/hooks/use-axios';
import { useTheme } from 'src/theme/Theme';
import { parseComment } from 'src/types/Comment';
import { trackReportComment } from 'src/utils/track';

import { makeStyles } from '@material-ui/core';

const POPUP_CLOSE_AFTER_SUCCESS_TIMEOUT = 3000;

type StylesProps = {
  hover: boolean;
}

const useStyles = makeStyles(({ palette }) => ({
  submitButton: ({ hover }: StylesProps) => ({
    color: hover ? palette.textWarning.main : undefined,
    transition: 'color 160ms ease',
  }),
}));

const ReportButton: React.FC<ButtonProps> = (props) => {
  const [hover, setHover] = useState(false);
  const classes = useStyles({ hover });

  return (
    <Button
      size="large"
      className={classes.submitButton}
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
          Le commentaire a été signalée, merci pour votre contribution ! 💪
        </Text>
      </Flex>
    </div>
  );
};

type ReportPopupProps = RouteComponentProps<{ id: string }>;

const ReportPopup: React.FC<ReportPopupProps> = ({ match }) => {
  useTrackPageview();

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [alreadyReported, setArleadyReported] = useState(false);
  const { colors: { border }, sizes: { big }, borderRadius } = useTheme();

  const [{ data: comment, loading, error }] = useAxios('/api/reaction/' + match.params.id, parseComment);

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
      trackReportComment();
      setSuccess(true);
      setTimeout(window.close, POPUP_CLOSE_AFTER_SUCCESS_TIMEOUT);
    }
  }, [status, setSuccess]);

  const onSubmit = () => {
    if (comment) {
      report({
        url: `/api/reaction/${comment.id}/report`,
        data: {
          commentId: comment.id,
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
        Signaler le commentaire de {comment.author.nick}
      </Text>

      <Break size={10} />

      <Text bold color="textWarning">
        <p style={{ margin: `${big}px 0` }}>
          Vous êtes sur le point de signaler un commentaire.
        </p>
        <p style={{ margin: `${big}px 0` }}>
          {/* eslint-disable-next-line max-len */}
          Il est important de signaler les commentaires qui dérogent à <WebsiteLink to="/charte.html">la charte</WebsiteLink> : cela en informera les modérateurs qui pourront entreprendre une action en fonction de la situation.
        </p>
        <p style={{ margin: `${big}px 0` }}>
          {/* eslint-disable-next-line max-len */}
          Cependant, être en désaccord avec un message n'est pas un motif valable pour la signaler, et abuser de la fonction de signalement de manière répété et sans raison valable peut entrainer une suspension de votre compte.
        </p>
      </Text>

      <Break size={30} />

      <Box
        p={big}
        border={`1px solid ${border}`}
        borderRadius={borderRadius}
        style={{ width: '100%', boxSizing: 'border-box' }}
      >
        <CommentBody text={comment.text} />
      </Box>

      <Break size={30} />

      <TextArea
        fullWidth
        rows={4}
        placeholder="Précisez en quelques mots le motif du signalement si nécessaire"
        style={{ resize: 'vertical' }}
        onChange={e => setMessage(e.currentTarget.value)}
      />

      { alreadyReported && (
        <Box mt={30} style={{ textAlign: 'center' }}>
          <Text bold color="textWarning" >Vous avez déjà signalé ce commentaire</Text>
        </Box>
      ) }

      <Flex mt={4 * big} flexDirection="row" justifyContent="center">
        <ReportButton loading={reportLoading} onClick={onSubmit} />
      </Flex>

    </Box>
  );
};

export default ReportPopup;
