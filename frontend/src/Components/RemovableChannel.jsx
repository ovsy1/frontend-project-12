import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveChannel } from '../store/features/chats-slice.js';

function RemovableChannel({ channel }) {
  const dispatch = useDispatch();
  const { currentChannel } = useSelector((state) => state.chats);
  const { id, name } = channel;
  const buttonStyle = currentChannel === id && 'primary';

  return (
    <Nav.Item key={id} className="w-100">
      <Button
        role="button"
        type="button"
        className="w-100 rounded-0 text-start text-truncate my-1 sss"
        variant={buttonStyle}
        onClick={() => dispatch(setActiveChannel(id))}
      >
        <span>#</span>
        {name}
      </Button>
  </Nav.Item>
  );
}

export default RemovableChannel;
