import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './context/AuthContextProvider.jsx';

import languages from './locales/index.js';
import App from './Components/App.jsx';

export default async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources: languages,
      fallbackLng: 'ru',
    });

  const vdom = (
    <I18nextProvider>
      <BrowserRouter>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </BrowserRouter>
    </I18nextProvider>
  );

  return vdom;
};
