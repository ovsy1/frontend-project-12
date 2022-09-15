import React, { useRef, useEffect } from 'react';
import {
  Col, Form, FormControl, Row, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';

import MessageList from './MessageList.jsx';
import { useSocket } from '../../hooks/useAuth.js';

function Messages() {
  const { currentChannel, channels, messages } = useSelector((state) => state.chats);
  const nameCurrentChannel = channels.filter((c) => c.id === currentChannel)[0].name;
  const countCurrentChannel = messages.filter((m) => m.channelId === currentChannel).length;
  const socket = useSocket();
  const username = localStorage.getItem('username');
  const { t } = useTranslation();
  const textInput = useRef(null);

  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('fr'));

  useEffect(() => {
    textInput.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      const filteredMessage = filter.check(values.message)
        ? filter.clean(values.message)
        : values.message;
      const newMessage = {
        message: filteredMessage,
        channelId: currentChannel,
        username,
      };

      socket.addNewMessage(newMessage, (response) => {
        if (response.status === 'ok') {
          formik.resetForm();
        }
      });
    },
  });

  return (
    <Col className="d-flex flex-column h-100 p-0">
      <div className="bg-white mx-0 mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${nameCurrentChannel || null}`}</b>
        </p>
        <span className="text-muted">{t('messages.messages', { count: countCurrentChannel })}</span>
      </div>
      <MessageList />
      <div className="mt-auto px-5 py-3">
        <Form onSubmit={formik.handleSubmit} className="form-label">
          <Row className="align-items-center">
            <Col className="p-0">
              <FormControl
              ref={textInput}
              data-testid="new-message"
              aria-label={t('messages.ariaLabel')}
              placeholder={t('messages.placeholderName')}
              name="message"
              type="text"
              value={formik.values.message}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
              />
            </Col>
            <Col xs="auto">
              <Button
              role="button"
              className="btn btn-group-vertical"
              type="submit"
              name={t('messages.send')}
              disabled={formik.values.message === '' || formik.isSubmitting}
              >
                {t('messages.send')}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Col>
  );
}

export default Messages;
