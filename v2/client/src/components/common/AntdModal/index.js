import React from 'react';
import { Modal, Button } from 'antd';

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
    <>
      <Button onClick={() => info(content, title)} style={btnStyle}>
        {btnText || 'Find out more about this section'}
      </Button>
    </>
  );
};

export default AntdModal;
