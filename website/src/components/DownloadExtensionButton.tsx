import React from 'react';

import env from 'src/env';

type DownloadExtensionProps = {
  children: string;
};

const DownloadExtension: React.FC<DownloadExtensionProps> = ({ children }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '20px 0',
    textAlign: 'center',
  }}>
    <a
      href={env.CHROME_EXTENSION_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="download-extension-button"
      style={{
        border: '1px solid',
        borderColor: '#4CAF50',
        background: '#81c784',
        padding: '8px 20px',
        borderRadius: 2,
        fontSize: '1.2rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: '#FFF',
        transition: 'opacity 200ms',
      }}
    >
      { children }
    </a>
  </div>
);

export default DownloadExtension;
