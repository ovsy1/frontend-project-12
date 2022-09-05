import React from 'react';
import {
  Button, ButtonGroup, Dropdown, Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function Channel({ channel }) {
  const { name, id } = channel;
  const { t } = useTranslation();

  return (
    <Nav.Item key={id} as="li" className="w-100">
      <Dropdown className="d-flex" as={ButtonGroup}>
        <Button
          role="button"

          type="button"
          className="w-100 rounded-0 text-start text-truncate my-1"
        >
          <span># </span>
          {name}
        </Button>
        <Dropdown.Toggle
          aria-haspopup="true"
          split
          className="flex-grow-0 my-1 rounded-end"
        />
        <Dropdown.Menu>
          <Dropdown.Item >
            {t('channels.remove')}
          </Dropdown.Item>
          <Dropdown.Item >
            {t('channels.rename')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
}

export default Channel;
