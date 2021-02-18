import React, { useState } from 'react';

import styled from '@emotion/styled';

import Checkbox from 'src/components/elements/Checkbox/Checkbox';
import { ExternalLink } from 'src/components/elements/Link/Link';
import Collapse from 'src/components/layout/Collapse/Collapse';
import Fade from 'src/components/layout/Fade/Fade';
import { spacing } from 'src/theme';
import env from 'src/utils/env';

const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${spacing(2, 0)};
`;

const LabelText = styled.span`
  margin-left: ${spacing(2)};
`;

const WarningMessage: React.FC = () => (
  <Fade in>
    Il est important que chaque membre ait pris connaissance de la charte. Si ce n'est pas encore fait, accordez{' '}
    <strong>5 minutes</strong> à sa lecture avant de vous inscrire.
  </Fade>
);

type AcceptRulesCheckbox = {
  display: boolean;
  checked?: boolean;
  onChange: (event: React.ChangeEvent) => void;
};

const AcceptRulesCheckbox: React.FC<AcceptRulesCheckbox> = ({ display, ...props }) => {
  const [displayWarning, setDisplayWarning] = useState(false);

  const handleChange = (e: React.ChangeEvent) => {
    if (!displayWarning) {
      setDisplayWarning(true);
    } else {
      props.onChange(e);
    }
  };

  return (
    <Collapse in={display}>
      <Label>
        <Checkbox tabIndex={display ? undefined : -1} required={display} {...props} onChange={handleChange} />
        <LabelText>
          J'accepte{' '}
          <ExternalLink tabIndex={display ? undefined : -1} href={env.WEBSITE_URL + '/charte.html'}>
            la charte
          </ExternalLink>
          .
        </LabelText>
      </Label>
      {displayWarning && <WarningMessage />}
    </Collapse>
  );
};

export default AcceptRulesCheckbox;
