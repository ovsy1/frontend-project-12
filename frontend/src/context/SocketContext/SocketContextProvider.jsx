import React from 'react';
import { useDispatch } from 'react-redux';

import SocketContext from './SocketContext';
import { addMessage } from '../../store/features/chats-slice.js';

function SocketContextProvider({ children, socket }) {
  const dispatch = useDispatch();

  socket.on('newMessage', (message) => {
    console.log(message);
    dispatch(addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    console.log(channel);
  });
  socket.on('renameChannel', (name) => {
    console.log(name);
  });
  socket.on('removeChannel', (id) => {
    console.log(id);
  });

  const socketValues = {
    addNewMessage: (message, response) => socket.emit('newMessage', message, response),
    newChannel: (channel, response) => socket.emit('newChannel', channel, response),
    renameChannel: (name, response) => socket.emit('renameChannel', name, response),
    removeChannel: (id, response) => socket.emit('removeChannel', id, response),
  };

  return (
    <SocketContext.Provider value={ socketValues }>{children}</SocketContext.Provider>
  );
}

export default SocketContextProvider;
