import React from 'react'
import 'semantic-ui-css/semantic.min.css';
import {
  ModalDescription,
  ModalContent,
  Header,
  Modal,
} from 'semantic-ui-react'

const Modals = ({ open, close, title, children }) => {
  return (
    <Modal
      onClose={close}
      open={open}
      centered={true}
    >
      <ModalContent >
        <ModalDescription>
          <Header>{title}</Header>
          <div className='my-4'>.</div>
          <div className='my-4 modal-scrollable-content'>
            {children}
          </div>
        </ModalDescription>
      </ModalContent>
    </Modal>
  )
}

export default Modals