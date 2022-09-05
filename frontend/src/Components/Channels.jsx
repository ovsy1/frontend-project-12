import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import Channel from './Channel.jsx';
import RemovableChannel from './RemovableChannel.jsx';

function Channels() {
  const { channels } = useSelector((state) => state.chats);
  const { t } = useTranslation();

  return (
    <Col className="col-4 col-md-2 border-end pt-5 px-0">
    <div className="d-flex justify-content-between mb-2 ps-4 pe-2 align-text-bottom">
      <h5>{t('channels.name')}</h5>
      <Button
        type="button"
        size="sm"
        variant="outline-primary"
        className="border"
      >
        +
      </Button>
    </div>
    <div id="channel-list">
      <Nav fill as="ul" variant="pills" className="flex-column px-2">
        {channels.map((channel) => (channel.removable
          ? <Channel key={_.uniqueId('Channel_')} channel={channel}/>
          : <RemovableChannel key ={_.uniqueId('RemovableChannel')} channel={channel}/>))}
      </Nav>
    </div>
  </Col>
  );
}

export default Channels;
