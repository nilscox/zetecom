import React from 'react';

type DiffChunkProps = {
  added?: boolean;
  removed?: boolean;
};

const DiffChunk: React.FC<DiffChunkProps> = ({ added, removed, children }) => (
  <span
    style={{
      ...(added && { background: '#FCC' }),
      ...(removed && { background: '#CFC' }),
    }}
  >
    { children }
  </span>
);

type DiffMessageProps = {
  diff?: Diff.Change[];
};

const DiffMessage: React.FC<DiffMessageProps> = ({ diff }) => {
  return (
    <pre style={{ padding: 4, fontFamily: 'monospace', fontSize: 13 }}>
      {diff.map(({ added, removed, value }, n) => (
        <DiffChunk key={n} added={added} removed={removed}>{ value }</DiffChunk>
      ))}
    </pre>
  );
};

export default DiffMessage;
