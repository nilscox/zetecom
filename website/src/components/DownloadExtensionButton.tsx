import React from 'react';

import { useEnvironment } from 'src/index';
import Link from 'src/components/Link';

import './DownloadExtensionButton.scss';

type DownloadExtensionProps = {
  children: string;
};

const DownloadExtension: React.FC<DownloadExtensionProps> = ({ children }) => {
  const extensionUrl = useEnvironment('CHROME_EXTENSION_URL');

  return (
    <div className="download-extension-container">
      <Link
        openInNewTab
        className="download-extension"
        href={extensionUrl}
        title={!extensionUrl ? 'L\'extension sera bientôt disponible !' : undefined}
      >
        { children }
      </Link>
    </div>
  );
};

export default DownloadExtension;
