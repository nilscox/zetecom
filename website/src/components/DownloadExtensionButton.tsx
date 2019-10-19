import React from 'react';

import { useEnvironment } from 'src/index';
import Link from './Link';

import './DownloadExtensionButton.scss';

type DownloadExtensionProps = {
  children: string;
};

const DownloadExtension: React.FC<DownloadExtensionProps> = ({ children }) => {
  const { CHROME_EXTENSION_URL } = useEnvironment();

  return (
    <div className="download-extension-container">
      <Link
        href={CHROME_EXTENSION_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="download-extension"
      >
        { children }
      </Link>
    </div>
  );
};

export default DownloadExtension;
