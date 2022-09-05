import React, { useRef, useEffect } from 'react';
import {
  Col, Form, FormControl, Row, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

import MessageList from './MessageList.jsx';
import { useSocket } from '../hooks/useAuth.js';

function Messages() {
  // const dispatch = useDispatch();
  const { currentChannel } = useSelector((state) => state.chats);
  const socket = useSocket();
  const username = localStorage.getItem('username');
  const { t } = useTranslation();
  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      const newMessage = {
        message: values.message,
        channelId: currentChannel,
        username,
      };

      socket.addNewMessage(newMessage, (response) => {
        console.log(response, newMessage);
      });

      formik.resetForm();
    },
  });

  return (
    <Col className="d-flex flex-column h-100 p-0">
      <MessageList />
      <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} className="form-label">
      <Row className="align-items-center">
        <Col className="p-0">
          <FormControl
            ref={textInput}
            data-testid="new-message"
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
