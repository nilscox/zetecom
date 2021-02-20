import React from 'react';

import styled from '@emotion/styled';

import Box from 'src/components/elements/Box/Box';
import Icon from 'src/components/elements/Icon/Icon';
import IconButton from 'src/components/elements/IconButton/IconButton';
import Select from 'src/components/elements/Select/Select';
import { Next, Prev } from 'src/components/icons';
import { spacing } from 'src/theme';

const StyledIconButton = styled(IconButton)`
  margin: ${spacing(0, 2)};
`;

type RevisionSelectionProps = {
  revisionsCount: number;
  revision: number;
  setRevision: (revision: number) => void;
};

const RevisionSelection: React.FC<RevisionSelectionProps> = ({ revisionsCount, revision, setRevision }) => {
  const prevRevision = () => setRevision(revision - 1);
  const nextRevision = () => setRevision(revision + 1);

  return (
    <Box flex alignItems="center">
      <label htmlFor="version">Version</label>

      <StyledIconButton disabled={revision <= 1} onClick={prevRevision} title="Version précédente">
        <Icon as={Prev} />
      </StyledIconButton>

      <Select id="version" value={revision} onChange={e => setRevision(Number(e.currentTarget.value))}>
        {Array(revisionsCount)
          .fill(null)
          .map((_, n) => n + 1)
          .map(n => (
            <option key={n} value={n}>
              {n} &nbsp; {'->'} &nbsp; {n + 1}
            </option>
          ))}
      </Select>

      <StyledIconButton disabled={revision >= revisionsCount} onClick={nextRevision} title="Version suivante">
        <Icon as={Next} />
      </StyledIconButton>
    </Box>
  );
};

export default RevisionSelection;
