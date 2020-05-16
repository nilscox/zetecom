import React from 'react';

import { useEnvironment } from 'src/index';
import Link from 'src/components/Link';

import Image from 'src/components/Image';
import logoFirefox from 'src/images/firefox-logo.png';
import logoChrome from 'src/images/chrome-logo.png';

import './DownloadExtensionButton.scss';

const logo = {
  firefox: logoFirefox,
  chrome: logoChrome,
}

type DownloadExtensionProps = {
  browser: 'firefox' | 'chrome',
  children: string;
};

const DownloadExtension: React.FC<DownloadExtensionProps> = ({ browser, children }) => {
  const url = {
    firefox: useEnvironment('FIREFOX_ADDON_URL'),
    chrome :useEnvironment('CHROME_EXTENSION_URL'),
  }[browser];

  const notAvailableMessage = {
    firefox: 'L\'addon firefox sera bientôt disponible',
    chrome: 'L\'extension chrome sera bientôt disponible',
  }[browser];

  return (
    <Link
      openInNewTab
      className={`download-extension browser-${browser}`}
      href={url}
      title={!url ? notAvailableMessage : undefined}
    >
      <Image src={logo[browser]} alt={`logo ${browser}`} width={24} height={24} />
      { children }
    </Link>
  );
};

const DownloadExtensions: React.FC<{ disposition: 'row' | 'column' }> = ({ disposition }) => {
  return (
    <div className={`download-extensions-container disposition-${disposition}`}>
      <DownloadExtension browser="firefox">Add-on firefox</DownloadExtension>
      <DownloadExtension browser="chrome">Extension chrome</DownloadExtension>
    </div>
  );
};

export default DownloadExtensions;
