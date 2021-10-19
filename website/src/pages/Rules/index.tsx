import queryString from 'query-string';
import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import Title from 'src/components/Title';

import Rules_0_1 from './versions/RulesV0.1';
import Rules_0_2, { Changes as Changes_0_2 } from './versions/RulesV0.2';
import Rules_0_3, { Changes as Changes_0_3 } from './versions/RulesV0.3';

import './Rules.scss';

const versions = {
  '0.1': [Rules_0_1],
  '0.2': [Rules_0_2, Changes_0_2],
  '0.3': [Rules_0_3, Changes_0_3],
};

const currentVersion = '0.3';

type Version = keyof typeof versions;

const isVersion = (version: string): version is Version => {
  return Object.keys(versions).includes(version);
};

const Rules: React.FC = () => {
  const location = useLocation();
  const query = queryString.parse(location.search);

  if (query.version && !isVersion(query.version as string)) {
    return <Redirect to="/charte.html" />;
  }

  const version = query.version as Version;
  const [Rules, Changes] = versions[version] ?? versions[currentVersion];
  const previousVersion = version && Object.keys(versions)[Object.keys(versions).indexOf(version) - 1];

  return (
    <>
      <Title id="Charte">La charte de Zétécom{version && <>, version {version}</>}</Title>

      {version && Changes && (
        <div className="changes">
          <hr />
          Les différences entre les versions {previousVersion} et {version} de la charte sont :
          <Changes />
          <hr />
        </div>
      )}

      <Rules />
    </>
  );
};

export default Rules;
