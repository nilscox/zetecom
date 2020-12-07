import React from 'react';

import clsx from 'clsx';

import { useEnvironment } from 'src/utils/env';
import Link from 'src/components/Link';
import Image from 'src/components/Image';

import installFirefoxAddon from './install-firefox-addon.png';
import installChromeExtension from './install-chrome-extension.png';

import './DownloadExtensionButtons.scss';

type DownloadExtensionProps = {
  staging?: boolean;
  browser: 'firefox' | 'chrome',
};

const DownloadExtension: React.FC<DownloadExtensionProps> = ({ staging, browser }) => {
  const linkProps = {
    firefox: {
      href: useEnvironment(staging ? 'FIREFOX_ADDON_STAGING_URL' : 'FIREFOX_ADDON_URL'),
      className: 'firefox-addon',
    },
    chrome :{
      href: useEnvironment(staging ? 'CHROME_EXTENSION_STAGING_URL' : 'CHROME_EXTENSION_URL'),
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
      title={!linkProps.href ? notAvailableMessage : undefined}
      {...linkProps}
      className={clsx(`download-extension browser-${browser}`, linkProps.className)}
    >
      <Image {...imageProps} />
    </Link>
  );
};

type DownloadExtensionButtonsProps = {
  staging?: boolean;
  disposition: 'row' | 'column';
};

const DownloadExtensionsButtons: React.FC<DownloadExtensionButtonsProps> = ({ staging, disposition }) => {
  return (
    <div className={`download-extensions-container disposition-${disposition}`}>
      <DownloadExtension staging={staging} browser="firefox" />
      <DownloadExtension staging={staging} browser="chrome" />
    </div>
  );
};

export default DownloadExtensionsButtons;
