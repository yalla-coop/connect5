import React from 'react';
import { Popover } from 'antd';
import styled from 'styled-components';
import { colors } from '../../../theme';

export const AntdBtn = styled.button`
  background: none;
  border: none;
`;

export const Icon = styled.i`
  color: ${colors.green};
  font-size: 25px;
`;

const InfoPopUp = ({ details, ...props }) => {
  return (
    <div style={{ maxWidth: '200px' }}>
      <Popover content={details}>
        <AntdBtn type="button">
          <Icon className="fas fa-question-circle" />
        </AntdBtn>
      </Popover>
    </div>
  );
};

export default InfoPopUp;
