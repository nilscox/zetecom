import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

type Notification = {
  id: string;
  type: string;
  payload: Record<string, unknown>;
};

interface NotificationsSlice {
  notifications: Notification[];
}

const initialState: NotificationsSlice = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
});

export const store = configureStore({
  reducer: {
    notifications: notificationsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const App: React.FC = () => {
  return null;
};

export const NotificationsView: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
