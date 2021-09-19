import { Fragment } from 'react';

import styled from '@emotion/styled';

import { color, font, spacing } from '~/theme';

import makeDiff from './makeDiff';

const Container = styled.div`
  font-family: ${font('monospace')};
  line-height: 1.2;

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
  }

  .left,
  .right {
    flex: 1;
  }
`;

const DiffLine: React.FC<{ chunks: Diff.Change[] }> = ({ chunks }) => (
  <Fragment>
    {chunks.map((chunk, n) => (
      <DiffChunk key={n} chunk={chunk} />
    ))}
  </Fragment>
);

const DiffChunk: React.FC<{ chunk: Diff.Change }> = ({ chunk: { value, added, removed } }) => {
  if (added) {
    return <ins>{value}</ins>;
  }

  if (removed) {
    return <del>{value}</del>;
  }

  return <Fragment>{value}</Fragment>;
};

const Separator = styled.div`
  border-left: 1px solid ${color('border')};
  margin: ${spacing(0, 2)};
  margin-top: -${spacing(1)};
  margin-bottom: -${spacing(1)};
`;

type DiffProps = {
  className?: string;
  before: string;
  after: string;
};

export const Diff: React.FC<DiffProps> = ({ className, before, after }) => {
  const lines = makeDiff(before, after, { simplify: true, group: true });

  return (
    <Container className={className}>
      {lines.map(([left, right], n) => (
        <div key={n} className="line">
          <div className="left" aria-label="left">
            <DiffLine chunks={left} />
          </div>

          <Separator />

          <div className="right" aria-label="right">
            <DiffLine chunks={right} />
          </div>
        </div>
      ))}
    </Container>
  );
};
