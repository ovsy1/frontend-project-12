import React from 'react';
import {
  Button, ButtonGroup, Dropdown, Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveChannel } from '../store/features/chats-slice.js';
import { setModal } from '../store/features/modal-slice.js';

function Channel({ channel, setRemoveModal, setRenameModal }) {
  const dispatch = useDispatch();
  const { currentChannel } = useSelector((state) => state.chats);

  const { name, id } = channel;
  const { t } = useTranslation();

  const buttonStyle = currentChannel === id && 'primary';

  const handleShowRemove = () => {
    setRemoveModal(true);
    dispatch(setModal({ name, id }));
  };

  const handleShowRename = () => {
    setRenameModal(true);
    dispatch(setModal({ name, id }));
  };

  return (
    <Nav.Item key={id} as="li" className="w-100">
      <Dropdown className="d-flex" as={ButtonGroup}>
        <Button
          role="button"

          type="button"
          className="w-100 rounded-0 text-start text-truncate my-1"
          variant={buttonStyle}
          onClick={() => dispatch(setActiveChannel(id))}
        >
          <span>{`# ${name}`}</span>
        </Button>
        <Dropdown.Toggle
          aria-haspopup="true"
          split
          className="flex-grow-0 my-1 rounded-end"
          variant={buttonStyle}
        />
        <Dropdown.Menu>
          <Dropdown.Item
          onClick={handleShowRemove}
          >
            {t('channels.remove')}
          </Dropdown.Item>
          <Dropdown.Item
          onClick={handleShowRename}
          >
            {t('channels.rename')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
}

export default Channel;
