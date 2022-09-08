import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import avatarImages from '../../images/login.jpg';
import LoginForm from '../LoginForm.jsx';

function Login() {
  const { t } = useTranslation();

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  style={{ width: '300px', height: '300px' }}
                  src={avatarImages}
                  className="rounded-circle img-thumbnail mt-5"
                  alt={t('login.header')}
                />
              </div>
              <LoginForm />
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('login.newToChat')}</span>
                {' '}
                <Link to={'/signup'}>{t('login.signup')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
