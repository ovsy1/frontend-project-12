import React from 'react';
import { useTranslation } from 'react-i18next';
import notFoundImg from '../../images/notFound.jpg';

function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="text-center h-100 mt-5">
      <img
        alt={t('notFound.header')}
        className="img-thumbnail"
        style={{ height: '700px' }}
        src={notFoundImg}
      />
      <h1 className="h4 text-muted">{t('notFound.header')}</h1>
      <p className="text-muted">
        {t('notFound.message')}
        <a href="/">{t('notFound.linkText')}</a>
      </p>
    </div>
  );
}

export default NotFoundPage;
