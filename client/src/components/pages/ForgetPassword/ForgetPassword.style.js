import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, borders, shadows } from '../../../theme';

export const Heading = styled.div`
  margin: 0 auto;
  width: 80%;
  padding: 1.5rem;
  text-align: center;
`;

export const H3 = styled.h3`
  text-align: center;
  font-size: 1.28rem;
  padding: 0.5rem;
  @media (min-width: 768px) {
    font-size: 1.4rem;
  }
`;

export const Hint = styled.p`
  text-align: center;
  @media (min-width: 768px) {
    padding: 1rem 0;
    margin: 0 auto;
  }
`;

export const ForgetPasswordForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
  @media (min-width: 768px) {
    background: ${colors.backgroundWashOut};
    padding: 1.5rem 1rem;
    box-shadow: ${shadows.secondary};
  }
`;

export const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    margin: 0 auto;
    background: ${colors.ligthGray};
  }
`;

export const StyledLink = styled(Link)`
  border: ${borders.button};
  padding: 6px 12px;
  border-radius: 3px;
  color: ${colors.primary}
  }
`;

export const InputDiv = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    background: ${colors.ligthGray};
  }
`;

export const ErrorMsg = styled.div`
  width: 80%;
  color: ${colors.red};
  margin-left: 3rem;
  font-size: 1rem;

  @media (min-width: 768px) {
    margin-left: 1rem;
  }
`;
