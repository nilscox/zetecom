import React from 'react';

import { useEnvironment } from 'src/index';
import Link from 'src/components/Link';
import Image from 'src/components/Image';

import installFirefoxAddon from './install-firefox-addon.png';
import installChromeExtension from './install-chrome-extension.png';

import './DownloadExtensionButtons.scss';

const images = {
  firefox: installFirefoxAddon,
  chrome: installChromeExtension,
}

type DownloadExtensionProps = {
  browser: 'firefox' | 'chrome',
};

const DownloadExtension: React.FC<DownloadExtensionProps> = ({ browser }) => {
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
      <Image src={images[browser]} alt={`extension ${browser}`} />
    </Link>
  );
};

const DownloadExtensionsButtons: React.FC<{ disposition: 'row' | 'column' }> = ({ disposition }) => {
  return (
    <div className={`download-extensions-container disposition-${disposition}`}>
      <DownloadExtension browser="firefox" />
      <DownloadExtension browser="chrome" />
    </div>
  );
};

export default DownloadExtensionsButtons;
