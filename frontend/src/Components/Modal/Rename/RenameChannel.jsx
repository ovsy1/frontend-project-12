import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import RenameModalForm from './RenameModalForm.jsx';

function RenameChannel({ renameModal, setRenameModal }) {
  const { t } = useTranslation();

  return (
    <Modal show={renameModal} centered onHide={() => setRenameModal(false)}>
      <Modal.Header>
        <Modal.Title className="h4">{t('modals.renameChannel')}</Modal.Title>
        <Button
          onClick={() => setRenameModal(false)}
          aria-label="Close"
          data-bs-dismiss="modal"
          className="btn btn-close"
        />
      </Modal.Header>
      <Modal.Body>
        <RenameModalForm setRenameModal={setRenameModal} />
      </Modal.Body>
    </Modal>
  );
}

export default RenameChannel;
