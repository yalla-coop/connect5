import styled from 'styled-components';
import { colors, colorCodes, borders } from '../../../theme';

export const SectionHeadline = styled.h1`
  font-weight: 400;
  font-size: 2rem;
  padding-top: 1rem;
  color: ${colors.black};
`;

export const SectionSubHeadline = styled.h2`
  font-weight: 400;
  font-size: 1.5rem;
  color: ${colors.blackSecondary};
`;

export const PromptHeadline = styled.h3`
  font-weight: 300;
  font-size: 1.5rem;
  padding-top: 1rem;
  color: ${colors.black};
`;

export const Paragraph = styled.p`
  ${({ strong }) => (strong ? 'font-weight: bold;' : '')}
  color: ${colors.blackSecondary};
`;

export const SessionDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${colors.white};
`;

export const DetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // border: 1px solid black;
  padding-top: 1rem;
`;

export const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: 1.5rem;

  button {
    color: ${colors.white};
    background-color: ${colors.blackSecondary};
    border: ${borders.button};
  }

  button: hover {
    color: ${colors.white};
    background-color: ${colors.primary};
  }
`;

export const SpinWrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;
