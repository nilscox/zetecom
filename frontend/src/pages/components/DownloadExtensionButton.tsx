import React from 'react';

type DownloadExtensionProps = {
  url: string;
  children: string;
};

const DownloadExtension: React.FC<DownloadExtensionProps> = ({ url, children }) => (
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '20px 0' }}>
    <a
      href={url}
      className="download-extension-button"
      style={{
        border: '1px solid #4CAF50',
        background: '#81c784',
        padding: '10px 25px',
        borderRadius: 2,
        fontSize: '1.3rem',
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
