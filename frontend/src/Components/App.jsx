import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Chat from './Pages/Chat.jsx';
import Login from './Pages/Login.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import Navbar from './Navbar.jsx';
import { useAuth } from '../hooks/useAuth.js';
import SignUp from './Pages/SignUp.jsx';

function App() {
  const { authStatus } = useAuth();

  return (
    <div className='d-flex flex-column h-100'>
      <Navbar/>
      <Routes>
        <Route path='/' element={authStatus ? <Chat /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
