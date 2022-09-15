/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

function MessageList() {
  const { messages, currentChannel } = useSelector((state) => state.chats);
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className="h-100 chat-messages overflow-auto text-break px-5"
      id="messages-box"
    >
      {
        messages.filter((message) => message.channelId === currentChannel).map((message) => <div key={message.id} className="text-break mb-2">
          <b>{message.username}</b>
          {':'}
          {message.message}
          <div ref={messageEndRef} />
        </div>)
      }
    </div>
  );
}

export default MessageList;
