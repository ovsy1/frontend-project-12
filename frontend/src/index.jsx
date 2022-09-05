import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import init from './init.jsx';

const startChat = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const vdom = await init();

  root.render(<React.StrictMode>{vdom}</React.StrictMode>);
};

startChat();
