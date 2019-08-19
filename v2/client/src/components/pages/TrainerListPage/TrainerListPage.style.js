import styled from 'styled-components';

import { colors } from '../../../theme';

export const Wrapper = styled.div`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 650px;
  margin: 0 auto;
`;

export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-bottom: 2rem;
`;

export const HeaderText = styled.h2`
  /* color: ${colors.gray}; */
  font-size: 1rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
`;

export const HeaderNumber = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
`;
