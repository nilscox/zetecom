import React from 'react';

import { useEnvironment } from 'src/index';
import Link from 'src/components/Link';

import './DownloadExtensionButton.scss';

type DownloadExtensionProps = {
  children: string;
};

const DownloadExtension: React.FC<DownloadExtensionProps> = ({ children }) => (
  <div className="download-extension-container">
    <Link openInNewTab className="download-extension" href={useEnvironment('CHROME_EXTENSION_URL')}>
      { children }
    </Link>
  </div>
);

export default DownloadExtension;
