import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { useSocket } from '../../../hooks/useAuth.js';

function RemoveChannel({ removeModal, setRemoveModal }) {
  const { t } = useTranslation();
  const socket = useSocket();
  const { targetModalID } = useSelector((state) => state.modal);

  const handleSubmit = (e) => {
    e.preventDefault();
    const removeData = { id: targetModalID };
    socket.removeChannel(removeData, () => {
      setRemoveModal(false);
      toast(t('toast.remove'));
    });
  };

  return (
    <Modal show={removeModal} centered onHide={() => setRemoveModal(false)}>
      <Modal.Header>
        <Modal.Title className="h4">{t('modals.removeChannel')}</Modal.Title>
        <Button
          onClick={() => setRemoveModal(false)}
          aria-label="Close"
          data-bs-dismiss="modal"
          className="btn btn-close"
        />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => setRemoveModal(false)}
            role="button"
            name={t('modals.cancel')}
            className="me-2 btn btn-secondary"
          >
            {t('modals.cancel')}
          </Button>
          <Button
            onClick={handleSubmit}
            role="button"
            name={t('modals.remove')}
            className="btn btn-danger"
          >
            {t('modals.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RemoveChannel;
