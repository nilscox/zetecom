import React from 'react';

import { useEnvironment } from 'src/index';
import Link from 'src/components/Link';
import Image from 'src/components/Image';

import installFirefoxAddon from './install-firefox-addon.png';
import installChromeExtension from './install-chrome-extension.png';

import './DownloadExtensionButtons.scss';

type DownloadExtensionProps = {
  browser: 'firefox' | 'chrome',
};

const DownloadExtension: React.FC<DownloadExtensionProps> = ({ browser }) => {
  const linkProps = {
    firefox: {
      href: useEnvironment('FIREFOX_ADDON_URL'),
      className: 'firefox-addon',
    },
    chrome :{
      href: useEnvironment('CHROME_EXTENSION_URL'),
      className: 'chrome-extension',
    },
  }[browser];

  const imageProps = {
    firefox: {
      alt: 'Installer l\'addon Firefox',
      src: installFirefoxAddon,
    },
    chrome: {
      src: installChromeExtension,
      alt: 'Installer l\'extension Chrome',
    },
  }[browser];

  const notAvailableMessage = {
    firefox: 'L\'addon firefox sera bientôt disponible',
    chrome: 'L\'extension chrome sera bientôt disponible',
  }[browser];

  return (
    <Link
      openInNewTab
      className={`download-extension browser-${browser}`}
      title={!linkProps.href ? notAvailableMessage : undefined}
      {...linkProps}
    >
      <Image {...imageProps} />
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
