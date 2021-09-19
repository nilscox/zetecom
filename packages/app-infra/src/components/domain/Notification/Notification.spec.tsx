import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  createAuthenticatedUser,
  createNotification,
  Notification,
  NotificationType,
  selectUserNotifications,
  setAuthenticatedUser,
  Store,
} from '@zetecom/app-core';
import {
  setNotification,
  setTotalNotifications,
  setTotalUnseenNotifications,
  setUserNotifications,
} from '@zetecom/app-core/modules/notifications/actions';
import { FakeDateGateway, MockUserGateway } from '@zetecom/app-core/shared/mocks';
import { expect } from 'earljs';
import { createMemoryHistory, History } from 'history';

import { Test } from '~/Test';
import { configureStore } from '~/utils/configureStore';

import { Notification as NotificationComponent } from './Notification';

describe('Notification', () => {
  let store: Store;

  let history: History;

  let userGateway: MockUserGateway;
  let dateGateway: FakeDateGateway;

  const setup = (notification: Notification<NotificationType>) => {
    userGateway = new MockUserGateway();
    dateGateway = new FakeDateGateway();

    store = configureStore({ userGateway, dateGateway });
    history = createMemoryHistory();

    store.dispatch(setAuthenticatedUser(createAuthenticatedUser()));
    store.dispatch(setNotification(notification));
    store.dispatch(setUserNotifications([notification]));
    store.dispatch(setTotalNotifications(1));
    store.dispatch(setTotalUnseenNotifications(1));

    render(
      <Test store={store} history={history}>
        <NotificationComponent notificationId={notification.id} />
      </Test>,
    );
  };

  it('displays a rules updated notification', () => {
    setup(
      createNotification({
        type: NotificationType.rulesUpdated,
        date: new Date(2020, 0, 1, 12, 12),
        payload: { version: '1.2.3' },
      }),
    );

    screen.getByText('Le 01 janvier 2020 à 12h12');
    screen.getByText('La charte a été mise à jour !');
    screen.getByText(/1\.2\.3/);
  });

  it('displays a comment reply notification', () => {
    setup(
      createNotification({
        type: NotificationType.commentReply,
        payload: {
          commentsAreaId: '1',
          informationTitle: 'information title',
          authorNick: 'author',
          text: 'hello',
        },
      }),
    );

    screen.getByText('author');
    screen.getByText('a répondu à votre commentaire sur');
    screen.getByText('information title');
    screen.getByText('hello');

    userEvent.click(screen.getByText('information title'));
    expect(history.location.pathname).toEqual('/commentaires/1');
  });

  it('displays a seen notification', () => {
    setup(createNotification({ seen: new Date() }));

    expect(screen.queryByTitle('Marquer comme lue')).toEqual(null);
  });

  it('marks the notification as seen', () => {
    setup(createNotification());

    userEvent.click(screen.getByTitle('Marquer comme lue'));

    expect(selectUserNotifications(store.getState())?.[0].seen).toEqual(dateGateway.now);
  });
});
