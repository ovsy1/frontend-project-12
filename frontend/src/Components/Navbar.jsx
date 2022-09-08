import React from 'react';
import { Button, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from '../hooks/useAuth.js';

const Navbar = () => {
  const { authStatus, toLogOut } = useAuth();
  const { t } = useTranslation();

  return (
    <BootstrapNavbar bg='white' expand='lg' className='shadow-sm'>
      <div className='container'>
        <BootstrapNavbar.Brand as={Link} to='/'>{t('Home')}</BootstrapNavbar.Brand>
        {authStatus && <Button onClick={toLogOut}>{t('logout')}</Button>}
      </div>
      <ToastContainer autoClose={2500} />
    </BootstrapNavbar>
  );
};

export default Navbar;
