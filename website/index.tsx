import React from 'react';
import ReactDOMServer from 'react-dom/server';

import routes from './src/routes';
import Page from './src/Page';

import { PageProvider } from 'src/PageContext';

const doctype = '<!DOCTYPE html>';

export default function render(locals: any) {
  return routes.reduce((obj, route) => ({
    ...obj,
    [route.path]: doctype + ReactDOMServer.renderToStaticMarkup(
      <PageProvider value={route}>
        <Page {...route} />
      </PageProvider>
    ),
  }), {});
};
