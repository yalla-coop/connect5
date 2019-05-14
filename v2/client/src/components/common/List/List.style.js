import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, borders, shadows } from '../../../theme';

export const Wrapper = styled.div`
  background-color: ${colors.white};
  box-shadow: ${shadows.primary};
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-bottom: 2rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 0.5rem;
`;

const sharedHeaderStyles = css`
  font-weight: 500;
  width: 100%;
  font-size: 1rem;
  margin: 0;
`;

export const DateHeader = styled.h3`
  ${sharedHeaderStyles};
`;

export const TypeHeader = styled.h3`
  ${sharedHeaderStyles};
  text-align: center;
`;

export const DetailsHeader = styled.h3`
  ${sharedHeaderStyles};
  text-align: center;
`;

export const NameHeader = styled.h3`
  ${sharedHeaderStyles};
  padding-left: 2rem;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: ${borders.inputBox};
  padding: 0.5rem 0;
`;

const sharedItemStyles = css`
  width: 100%;
  font-weight: 300;
  margin: 0;
`;

export const Date = styled.p`
  ${sharedItemStyles}
`;

export const Type = styled.div`
  ${sharedItemStyles}
  display: flex;
  justify-content: center;

  p {
    background-color: ${colors.lightGray};
    width: 1.75rem;
    height: 1.75rem;
    padding: 0.25rem 0;
    text-align: center;
    border-radius: 4px;
    margin: 0;
  }
`;

export const StyledLink = styled(Link)`
  ${sharedItemStyles}
  text-align: center;
  color: ${colors.gray};
  transition: all ease 0.2s;

  :hover {
    color: ${colors.primary};
  }
`;

export const Name = styled.p`
  ${sharedItemStyles}
  text-transform: capitalize;
  padding-left: 2rem;
`;
