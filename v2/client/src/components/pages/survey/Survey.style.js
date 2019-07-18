import styled from 'styled-components';
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

const SurveyQs = styled.div`
  main {
    background: ${colorCodes.offWhite};
  }
`;

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

const Disclaimer = styled.div`
  p {
    font-weight: 300;
  }
`;

const Form = styled.form`
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

const ProgressWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 1rem;
  color: ${colors.white};
`;

export { SurveyQs, Form, Disclaimer, ProgressWrapper };
