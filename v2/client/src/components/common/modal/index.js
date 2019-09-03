import React from 'react';
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
  z-index: 999999;
  background-color: #d7d7d7;
  padding: 10px 20px 40px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: ${shadows.primary};
`;

const closeButtonStyles = css`
  margin-bottom: 15px;
  padding: 3px 8px;
  cursor: pointer;
  border-radius: 50%;
  background-color: ${colors.lightGray};
  color: ${colors.black};
  border: none;
  width: 30px;
  height: 30px;
  font-weight: bold;
  align-self: flex-end;
`;

const TransWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.backgroundWashOut};
  position: fixed;
  z-index: 999999999;
  left: 0;
  top: 0;
`;

const StyledModal = styled.div`
  ${modalStyles}
  ${props => props.extraModalStyle}
`;

const StyledCloseButton = styled.button`
  ${closeButtonStyles}
  ${props => props.extraButtonStyle}
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
        <StyledCloseButton onClick={onClose}>x</StyledCloseButton>

        <ContentWrapper>{content}</ContentWrapper>
      </StyledModal>
    </TransWrapper>
  );

  if (!isOpen) {
    dialog = null;
  }
  return <div>{dialog}</div>;
};

export default Modal;
