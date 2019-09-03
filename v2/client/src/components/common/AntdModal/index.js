import React from 'react';
import { Modal, Button } from 'antd';
import styled from 'styled-components';
import { borders } from '../../../theme';

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px 0;
  border-bottom: ${borders.inputBox};
`;

function info(content, title) {
  Modal.info({
    title,
    content: <div>{content}</div>,
    onOk() {},
    style: { top: 20 },
  });
}

const AntdModal = ({ content, title, btnStyle, btnText }) => {
  return (
    <ButtonDiv>
      <Button onClick={() => info(content, title)} style={btnStyle}>
        {btnText || 'Find out more about this section'}
      </Button>
    </ButtonDiv>
  );
};

export default AntdModal;
