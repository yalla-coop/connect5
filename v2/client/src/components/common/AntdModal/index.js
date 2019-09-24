import React from 'react';
import { Modal, Button } from 'antd';
import styled from 'styled-components';
import Icon from 'antd/lib/icon';
import { borders } from '../../../theme';

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  display: inline;
  border-bottom: ${borders.inputBox};
  margin-right: 0.5rem;
`;

function info(content, title) {
  Modal.info({
    title,
    content: <div>{content}</div>,
    onOk() {},
    style: { top: 20 },
  });
}

const AntdModal = ({ content, title }) => {
  return (
    <ButtonDiv>
      <Icon
        type="info-circle"
        style={{ color: '#1890ff' }}
        onClick={e => {
          e.stopPropagation();
          info(content, title);
        }}
      />
    </ButtonDiv>
  );
};

export default AntdModal;
