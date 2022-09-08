import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import SocketContext from './SocketContext';
import {
  addMessage, addChannel, removeChannel, renameChannel,
} from '../../store/features/chats-slice.js';

function SocketContextProvider({ children, socket }) {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
    });
    socket.on('removeChannel', (id) => {
      dispatch(removeChannel(id));
    });
    socket.on('renameChannel', (data) => {
      dispatch(renameChannel(data));
    });

    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, []);

  const socketValues = useMemo(() => ({
    addNewMessage: (message, response) => socket.emit('newMessage', message, response),
    newChannel: (channel, response) => socket.emit('newChannel', channel, response),
    removeChannel: (id, response) => socket.emit('removeChannel', id, response),
    renameChannel: (data, response) => socket.emit('renameChannel', data, response),
  }), []);

  return (
    <SocketContext.Provider value={ socketValues }>{children}</SocketContext.Provider>
  );
}
export default SocketContextProvider;
