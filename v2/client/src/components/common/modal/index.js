import React, { Component } from 'react';
import styled from 'styled-components';
// import { colors } from '../../../theme';

const modalStyles = {
  width: '500px',
  maxWidth: '80%',
  height: '200px',
  margin: '0 auto',
  position: 'fixed',
  left: '50%',
  top: '45%',
  transform: 'translate(-50%,-50%)',
  zIndex: '999',
  backgroundColor: '#d7d7d7',
  padding: '10px 20px 40px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
};

const modalCloseButtonStyles = {
  marginBottom: '15px',
  padding: '3px 8px',
  cursor: 'pointer',
  borderRadius: '50%',
  backgroundColor: '#a9a9a9',
  border: 'none',
  width: '30px',
  height: '30px',
  fontWeight: 'bold',
  alignSelf: 'flex-end',
};

const Modal = ({ modalStyle, closeButtonStyle, children, onClose, isOpen }) => {
  let dialog = (
    <div style={modalStyle}>
      <button type="button" style={closeButtonStyle} onClick={onClose}>
        x
      </button>

      <div>{children}</div>
    </div>
  );

  if (!isOpen) {
    dialog = null;
  }
  return <div>{dialog}</div>;
};

Modal.defaultProps = {
  modalStyle: modalStyles,
  closeButtonStyle: modalCloseButtonStyles,
};

export default Modal;
