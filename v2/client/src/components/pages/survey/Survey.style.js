import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, colorCodes, borders } from '../../../theme';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SessionDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Disclaimer = styled.div`
  p {
    font-weight: 300;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const SubmitBtn = styled.button`
  border: ${borders.button};
  box-shadow: ${colors.button};
  color: ${colors.black};
  padding: 1rem;
  border-radius: 6px;
  font-weight: 900;
  font-size: 20px;
  width: 50%;
  align-self: center;
  cursor: pointer;
  opacity: 0.9;
  :hover {
    color: ${colorCodes.lightPrimary};
    opacity: 1;
  }
  @media (min-width: 768px) {
    width: 40%;
  }
`;

export const SubmitBtnDiv = styled.div`
  width: 100%;
  height: 10vh;
  background: ${colors.green};
  display: flex;
  justify-content: center;
`;

export const ProgressWrapper = styled.div`
  display: flex;
  position: fixed;
  top: 4rem;
  right: 3rem;
  color: ${colors.white};
`;

export const SpinWrapper = styled.div`
  height: 100vh;
  width: 100vw;
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

export const SkipButtonsDiv = styled(ButtonDiv)`
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

export const ButtonLink = styled(Link)``;

export const SectionHeadline = styled.h1`
  font-weight: 400;
  font-size: 2rem;
  padding-top: 1rem;
  color: ${colors.black};
`;

export const SectionSubHeadline = styled.h2`
  font-weight: 350
  font-size: 2rem;
  color: ${colors.black};
`;

export const PromptHeadline = styled.h3`
  font-weight: 300;
  font-size: 1.5rem;
  padding-top: 1rem;
  color: ${colors.black};
`;

export const Paragraph = styled.p`
${({ strong }) => (strong ? 'font-weight: 600;' : '300')}
color: ${colors.black};
`;

export const SessionDetails = styled.div`
  width: 100%;
  height: auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${colors.white};
`;

export const DetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
`;
