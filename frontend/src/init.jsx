import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import AuthContextProvider from './context/AuthContext/AuthContextProvider.jsx';
import SocketContextProvider from './context/SocketContext/SocketContextProvider.jsx';
import store from './store/store.js';
import languages from './locales/index.js';
import App from './Components/App.jsx';

export default async (socket) => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources: languages,
    fallbackLng: 'ru',
  });

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <BrowserRouter>
          <AuthContextProvider>
            <SocketContextProvider socket={socket}>
              <App />
            </SocketContextProvider>
          </AuthContextProvider>
        </BrowserRouter>
      </Provider>
    </I18nextProvider>
  );
};
