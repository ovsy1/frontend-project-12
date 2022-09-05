import React from 'react';
import { useSelector } from 'react-redux';

function MessageList() {
  const { messages, currentChannel } = useSelector((state) => state.chats);
  return (
    <div
    className="chat-messages h-100 overflow-auto text-break px-5"
    id="messages-box"
  >
    {
    messages
      .filter((message) => message.channelId === currentChannel)
      .map((message) => <div key={message.id} className="text-break mb-2">
    <b>{message.username}</b>
    {':'} {message.message}
  </div>)
  }
  </div>
  );
}

export default MessageList;
