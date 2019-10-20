import React from 'react';

import { useEnvironment } from 'src/index';

import './DownloadExtensionButton.scss';

type DownloadExtensionProps = {
  children: string;
};

const DownloadExtension: React.FC<DownloadExtensionProps> = ({ children }) => (
  <div className="download-extension-container">
    <a
      href={useEnvironment('CHROME_EXTENSION_URL')}
      target="_blank"
      rel="noopener noreferrer"
      className="download-extension"
    >
      { children }
    </a>
  </div>
);

export default DownloadExtension;
