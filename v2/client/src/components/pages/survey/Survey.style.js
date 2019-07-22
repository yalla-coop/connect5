import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, colorCodes, borders } from '../../../theme';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  height: 100vh;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${colors.backgroundWashOut};
`;

export const SurveyWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

export const SurveyQs = styled.div`
  main {
    background: ${colorCodes.offWhite};
  }
`;

export const Disclaimer = styled.div`
  p {
    font-weight: 300;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
  width: 100%;

  button {
    border: ${borders.button};
    color: ${colorCodes.black};
    padding: 8px;
    border-radius: 1rem;
    background: white;
    margin-top: 24px;
    width: 50%;
    align-self: center;
    cursor: pointer;

    :hover {
      color: ${colorCodes.lightPrimary};
    }
  }
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
  // border: 1px solid black;
  padding-top: 1rem;
`;
