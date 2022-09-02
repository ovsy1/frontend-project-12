import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Chat from './Chat.jsx';
import Login from './Login.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import Navbar from './Navbar.jsx';
import useAuth from '../hooks/useAuth.js';
import SignUp from './SignUp.jsx';

function App() {
  const { authStatus } = useAuth();

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={authStatus ? <Chat /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
