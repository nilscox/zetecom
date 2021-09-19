import { createNotification, NotificationType } from '@zetecom/app-core';
import { History } from 'history';

import { bopzor, commentsAreas, dougForcett, nilscox, vaccinsEffetsSecondaires } from '~/fixtures';
import { ReactRouterGateway } from '~/gateways/ReactRouterGateway';
import { EntitiesContainers, stubDependencies } from '~/gateways/stubs';
import { ToastifyNotificationGateway } from '~/gateways/ToastifyNotificationGateway';

import { configureStore } from './configureStore';

export const demoStore = (history: History) => {
  const containers = new EntitiesContainers({
    commentsAreas,
    users: [],
  });

  const dependencies = stubDependencies(containers);

  const store = configureStore({
    ...dependencies,
    routerGateway: new ReactRouterGateway(history),
    notificationGateway: new ToastifyNotificationGateway(),
  });

  for (const dependency of Object.values(dependencies)) {
    dependency.getState = store.getState.bind(store);
  }

  /* cSpell:words ssword */
  dependencies.userGateway.credentials.set(dougForcett, { email: dougForcett.email, password: 'p4ssword' });
  dependencies.userGateway.credentials.set(bopzor, { email: bopzor.email, password: 'p4ssword' });
  dependencies.userGateway.credentials.set(nilscox, { email: nilscox.email, password: 'p4ssword' });

  dependencies.userGateway.notifications = [
    createNotification({
      type: NotificationType.commentReply,
      payload: {
        commentsAreaId: vaccinsEffetsSecondaires.id,
        informationTitle: vaccinsEffetsSecondaires.information.title,
        authorNick: vaccinsEffetsSecondaires.comments[1].replies[0].author.nick,
        text: vaccinsEffetsSecondaires.comments[1].replies[0].text,
      },
    }),
    createNotification({
      type: NotificationType.rulesUpdated,
      payload: {
        version: '4.2',
      },
    }),
  ];

  return store;
};
