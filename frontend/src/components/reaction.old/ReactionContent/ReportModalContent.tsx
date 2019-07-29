import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Reaction } from 'src/types/Reaction';
import { reportReaction } from 'src/api/reaction';

import Loader from 'src/components/common/Loader';

import { ReactionBody } from './ReactionBody';

type ReportModalContentProps = {
  reaction: Reaction;
  closeModal: () => void;
};

export const ReportModalContent = (props: ReportModalContentProps) => {
  const reportOptions = {
    NONE: 'Motif du signalement',
    MISINFORMATION: 'Désinformation',
    RULES_VIOLATION: 'Non respect de la charte',
    OTHER: 'Autre...',
  };

  const [reportType, setReportType] = useState('NONE');
  const [message, setMessage] = useState('');
  const [submittingReport, setSubmittingReport] = useState(false);

  const onSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();

    if (reportType === 'NONE')
      return alert('Sélectionnez un motif');
    else if (reportType === 'OTHER' && message === '')
      return alert('Veillez préciser le motif');

    setSubmittingReport(true);

    try {
      await reportReaction(props.reaction.id, reportType, message || undefined);
      props.closeModal();
    } catch (e) {
      alert(e.message);
    } finally {
      setSubmittingReport(false);
    }
  };

  return (
    <div className="reaction-report-modal">

      <h2>Signaler la réaction de { props.reaction.author.nick }</h2>

      <div className="reaction-report-warning">
        Attention ! Vous êtes sur le point de signaler une réaction.<br />
        Il est important de signaler certaines réactions, mais pas toutes. Assurez-vous que la réaction de
        <em>{ props.reaction.author.nick }</em> est bien sujet à modération en vous référant à
        <Link to="/charte">la charte</Link>.
      </div>

      <ReactionBody reaction={props.reaction} expand="full" expandFull={() => {}} />

      <form className="reaction-report-form" onSubmit={onSubmitReport}>

        <select className="report-type" onChange={e => setReportType(e.target.value)}>
          { Object.keys(reportOptions).map((key: keyof typeof reportOptions) => (
            <option key={key} value={key}>{ reportOptions[key] }</option>
          )) }
        </select>

        { reportType === 'OTHER' && (
          <textarea
            className="report-message"
            placeholder="Précisez le motif..."
            onChange={e => setMessage(e.target.value)}
          />
        ) }

        <button className="report-button" onClick={onSubmitReport}>
          { submittingReport ? <Loader size="small" /> : 'Signaler' }
        </button>

      </form>

    </div>
  );
};
