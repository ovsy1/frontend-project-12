import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import Channel from './Channel.jsx';
import RemovableChannel from './RemovableChannel.jsx';
import AddChannel from '../Modal/Add/AddChannel.jsx';
import RemoveChannel from '../Modal/Remove/RemoveChannel.jsx';
import RenameChannel from '../Modal/Rename/RenameChannel.jsx';

function Channels() {
  const [showModal, setShowModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const [renameModal, setRenameModal] = useState(false);
  const { channels } = useSelector((state) => state.chats);
  const { t } = useTranslation();

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <Col className="col-4 col-md-2 border-end pt-5 px-0">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2 align-text-bottom">
        <h5>{t('channels.name')}</h5>
        <Button
          type="button"
          size="sm"
          variant="outline-primary"
          className="border"
          onClick={handleShowModal}
        >
          +
        </Button>
      </div>
      <div id="channel-list">
        <Nav fill as="ul" variant="pills" className="flex-column px-2">
          {channels.map((channel) => (channel.removable ? (
              <Channel
                key={_.uniqueId('Channel_')}
                channel={channel}
                setRemoveModal={setRemoveModal}
                setRenameModal={setRenameModal}
              />
          ) : (
              <RemovableChannel
                key={_.uniqueId('RemovableChannel')}
                channel={channel}
              />
          )))}
        </Nav>
      </div>
      {showModal && (
        <AddChannel setShowModal={setShowModal} showModal={showModal} />
      )}
      {removeModal && (
        <RemoveChannel
          removeModal={removeModal}
          setRemoveModal={setRemoveModal}
        />
      )}
      {renameModal && (
        <RenameChannel
          renameModal={renameModal}
          setRenameModal={setRenameModal}
        />
      )}
    </Col>
  );
}

export default Channels;
