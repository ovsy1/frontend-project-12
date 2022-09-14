import React, { useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import validationForm from '../../../helpers/validation.js';
import { useSocket } from '../../../hooks/useAuth.js';

function RenameModalForm({ setRenameModal }) {
  const { targetModalID } = useSelector((state) => state.modal);
  const { channels } = useSelector((state) => state.chats);
  const channelsName = channels.map((channel) => channel.name);
  const textInput = useRef(null);
  const { t } = useTranslation();
  const { addChannelForm } = validationForm();
  const socket = useSocket();

  useEffect(() => {
    textInput.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: addChannelForm(channelsName),
    onSubmit: ({ name }) => {
      const data = {
        name,
        id: targetModalID,
      };

      socket.renameChannel(data, (response) => {
        if (response.status === 'ok') {
          setRenameModal(false);
          toast(t('toast.rename'));
        }
      });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control
          name='name'
          id='AddedForm'
          className='mb-2'
          testid='rename-channel'
          onChange={formik.handleChange}
          ref={textInput}
          disabled={formik.isSubmitting}
          isInvalid={formik.errors.name}
          value={formik.values.name}
        />
        <Form.Label htmlFor='AddedForm'>{t('modals.nameChannel')}</Form.Label>
        <Form.Control.Feedback type='invalid'>
          {t(formik.errors.name)}
        </Form.Control.Feedback>
        <div className='d-flex justify-content-end'>
          <Button
            onClick={() => setRenameModal(false)}
            type='button'
            name={t('modals.cancel')}
            className='me-2 btn btn-secondary'
          >
            {t('modals.cancel')}
          </Button>
          <Button
            type='submit'
            name={t('modals.send')}
            className='btn btn-primary'
          >
            {t('modals.send')}
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
}

export default RenameModalForm;
