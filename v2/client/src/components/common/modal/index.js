import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { colors, shadows } from '../../../theme';

const modalStyles = css`
  width: 500px;
  max-width: 80%;
  height: 200px;
  margin: 0 auto;
  position: fixed;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: #d7d7d7;
  padding: 10px 20px 40px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: ${shadows.primary};
`;

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

const TransWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.backgroundWashOut};
  position: fixed;
  left: 0;
  top: 0;
`;

const StyledModal = styled.div`
  ${modalStyles}
  ${props => props.extraModalStyle}
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Modal = ({
  modalStyle,
  closeButtonStyle,
  content,
  onClose,
  isOpen,
  ...props
}) => {
  let dialog = (
    <TransWrapper>
      <StyledModal {...props}>
        <button type="button" style={closeButtonStyle} onClick={onClose}>
          x
        </button>

        <ContentWrapper>{content}</ContentWrapper>
      </StyledModal>
    </TransWrapper>
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