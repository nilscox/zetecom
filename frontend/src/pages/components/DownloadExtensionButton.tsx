import React from 'react';

import env from '../../utils/env';

type DownloadExtensionProps = {
  children: string;
};

if (!env.CHROME_EXTENSION_ID)
  console.warn('CHROME_EXTENSION_ID environment is not set');

const DownloadExtension: React.FC<DownloadExtensionProps> = ({ children }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '20px 0',
    textAlign: 'center',
  }}>
    <a
      href={
        env.CHROME_EXTENSION_ID
          ? `https://chrome.google.com/webstore/detail/${env.CHROME_EXTENSION_ID}`
          : undefined
      }
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
