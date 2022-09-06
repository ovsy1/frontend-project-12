import React, { useRef, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import validationForm from '../../../helpers/validation.js';

function AddModalForm({ setShowModal }) {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const textInput = useRef(null);
  const { t } = useTranslation();
  const { channels } = useSelector((state) => state.chats);
  const channelsName = channels.map((channel) => channel.name);

  const { addChannelForm } = validationForm();

  const handleClose = () => {
    setShowModal(false);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: addChannelForm(channelsName),
  });

  useEffect(() => {
    textInput.current.focus();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control
          name="name"
          data-testid="add-channel"
          className="mb-2"
          onChange={formik.handleChange}
          ref={textInput}
          disabled={formik.isSubmitting}
          isInvalid={formik.errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {t(formik.errors.name)}
        </Form.Control.Feedback>
        <div className="d-flex justify-content-end">
          <Button
            onClick={handleClose}
            type="button"
            name={t('modals.cancel')}
            className="me-2 btn btn-secondary"
          >
            {t('modals.cancel')}
          </Button>
          <Button type="submit" name={t('modals.send')} className="btn btn-primary">
            {t('modals.send')}
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
}

export default AddModalForm;
