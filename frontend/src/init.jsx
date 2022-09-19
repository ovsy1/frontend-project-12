import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  Provider as ProviderRollbar,
  ErrorBoundary,
  LEVEL_WARN,
} from '@rollbar/react';

import filter from 'leo-profanity';
import AuthContextProvider from './context/AuthContext/AuthContextProvider.jsx';
import SocketContextProvider from './context/SocketContext/SocketContextProvider.jsx';
import store from './store/store.js';
import languages from './locales/index.js';
import App from './Components/App.jsx';

export default async (socket) => {
  const i18n = i18next.createInstance();

  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('fr'));

  await i18n.use(initReactI18next).init({
    resources: languages,
    fallbackLng: 'ru',
  });

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },

  };

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <BrowserRouter>
          <AuthContextProvider>
            <SocketContextProvider socket={socket}>
              <ProviderRollbar config={rollbarConfig}>
                <ErrorBoundary level={LEVEL_WARN}>
                  <App />
                </ErrorBoundary>
              </ProviderRollbar>
            </SocketContextProvider>
          </AuthContextProvider>
        </BrowserRouter>
      </Provider>
    </I18nextProvider>
  );
};
