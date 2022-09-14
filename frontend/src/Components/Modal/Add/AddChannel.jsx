import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import AddModalForm from './AddModalForm.jsx';

function AddChannel({ setShowModal, showModal }) {
  const { t } = useTranslation();

  return (
    <Modal centered show={showModal} onHide={setShowModal}>
      <Modal.Header>
        <Modal.Title className="h4">{t('modals.addChannel')}</Modal.Title>
        <Button
          onClick={() => setShowModal(false)}
          aria-label="Close"
          data-bs-dismiss="modal"
          className="btn btn-close"
        />
      </Modal.Header>
      <Modal.Body>
        <AddModalForm setShowModal={setShowModal}/>
      </Modal.Body>
    </Modal>
  );
}

export default AddChannel;
