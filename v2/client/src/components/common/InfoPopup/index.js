import React from 'react';
import { Popover } from 'antd';

const InfoPopUp = ({ details, ...props }) => {
  return (
    <div>
      <Popover content={details}>
        <button type="button" style={{ background: 'none', border: 'none' }}>
          <i className="fas fa-question-circle" style={{ color: 'green' }} />
        </button>
      </Popover>
    </div>
  );
};

export default InfoPopUp;
