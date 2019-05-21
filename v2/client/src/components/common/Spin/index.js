import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

export const Wrapper = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;

export default () => (
  <Wrapper>
    <Spin size="large" />
  </Wrapper>
);
