import React from 'react';

type NoteProps = {
  children: React.ReactNode;
};

const Note: React.FC<NoteProps> = ({ children }) => (
  <p style={{ borderLeft: '5px solid #CCC', margin: '10px 0', paddingLeft: 10 }}>
    { children }
  </p>
);

export default Note;
