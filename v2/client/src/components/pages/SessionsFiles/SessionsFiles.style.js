import styled from 'styled-components';

export const Wrapper = styled.div`
  padding-top: 5rem;
  width: 90%;
  margin: 0 auto;
  max-width: 650px;
`;

export const Title = styled.h1`
  font-family: Roboto;
  font-weight: 500;
  font-size: 18px;
  color: #4f4f4f;
  border-bottom: 1px solid #e0e0e0;
`;

export const WhiteDiv = styled.div`
  background: white;
  position: relative;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 90%;
  margin: 0 auto;

  &::after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    border-bottom: 1px solid #e0e0e0;
    left: 0;
  }
`;

export const Text = styled.p`
  font-family: Roboto;
  font-weight: ${({ bold }) => (bold ? '500' : '300')};
  font-size: 16px;
  color: #000000;
  margin: 1rem 0;
`;
