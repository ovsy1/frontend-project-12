import React, { useEffects } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import { useAuth } from '../hooks/useAuth.js';
import { loadChats } from '../store/features/chats-slice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import Loader from './Loader.jsx';

function Chat() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.chats);

  const { getHeader } = useAuth();

  useEffects(() => {
    dispatch(loadChats(getHeader));
  }, []);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      {error && <h2>{error}</h2>}
      {status === 'loading' && <Loader />}
      {status === 'received' && (
        <Row>
          <Channels />
          <Messages />
        </Row>

      )}
    </Container>
  );
}

export default Chat;
