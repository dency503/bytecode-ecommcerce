import PropTypes from 'prop-types';
import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';

const Modal = ({
  isOpen,
  onRequestClose,
  afterOpenModal,
  overrideStyle,
  children
}) => {
  const defaultStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      position: 'fixed',
      padding: '50px 20px',
      transition: 'all .5s ease',
      zIndex: 9999,
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      boxShadow: '0 5px 10px rgba(0, 0, 0, .1)',
      animation: 'scale .3s ease',
      ...overrideStyle
    }
  };

  return (
    <BootstrapModal
      show={isOpen}
      onShow={afterOpenModal}
      onHide={onRequestClose}
      centered
    >
      <BootstrapModal.Body>{children}</BootstrapModal.Body>
    </BootstrapModal>
  );
};

Modal.defaultProps = {
  overrideStyle: {},
  afterOpenModal: () => {}
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
 
  afterOpenModal: PropTypes.func,
  overrideStyle: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Modal;
