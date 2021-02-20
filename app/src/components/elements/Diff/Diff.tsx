import React from 'react';

import styled from '@emotion/styled';

import { color, font, spacing } from 'src/theme';

import makeDiff from './makeDiff';

const Container = styled.div`
  font-family: ${font('monospace')};

  ins {
    text-decoration: none;
    background-color: #4ddf5933;
  }

  del {
    text-decoration: none;
    background-color: #df4d4d33;
  }

  .line {
    display: flex;
    margin: ${spacing(1, 0)};
  }

  .left,
  .right {
    flex: 1;
  }
`;

const DiffLine: React.FC<{ chunks: Diff.Change[] }> = ({ chunks }) => (
  <>
    {chunks.map((chunk, n) => (
      <DiffChunk key={n} chunk={chunk} />
    ))}
  </>
);

const DiffChunk: React.FC<{ chunk: Diff.Change }> = ({ chunk: { value, added, removed } }) => {
  if (added) {
    return <ins>{value}</ins>;
  }

  if (removed) {
    return <del>{value}</del>;
  }

  return <>{value}</>;
};

const Separator = styled.div`
  border-left: 1px solid ${color('border')};
  margin: ${spacing(0, 2)};
  margin-top: -${spacing(1)};
  margin-bottom: -${spacing(1)};
`;

type DiffProps = {
  before: string;
  after: string;
};

const Diff: React.FC<DiffProps> = ({ before, after }) => {
  const lines = makeDiff(before, after, { simplify: true, group: true });

  return (
    <Container>
      {lines.map(([left, right], n) => (
        <div key={n} className="line">
          <div className="left">
            <DiffLine chunks={left} />
          </div>

          <Separator />

          <div className="right">
            <DiffLine chunks={right} />
          </div>
        </div>
      ))}
    </Container>
  );
};

export default Diff;
