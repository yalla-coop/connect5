import styled from 'styled-components';
import { colorCodes, borders } from '../../../theme';

const SurveyQs = styled.div`
  main {
    padding: 0 8px;
    background: ${colorCodes.offWhite};
  }
`;

const SurveyHeader = styled.header`
  height: 56px;
  display: flex;
  padding: 0 8px;

  justify-content: space-between;

  h1 {
    font-size: 2rem;
    font-weight: 300;
  }
`;

const SessionDetails = styled.div`
  background: ${colorCodes.lightGray};
  border-bottom: ${borders.button};
  span {
    font-weight: 600;
  }
  h3 {
    font-size: 2rem;
    font-weight: 300;
  }
  margin: 1rem 0;
`;

const Intro = styled.div``;

const Disclaimer = styled.div`
  p {
    font-weight: 300;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;

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

export { SurveyQs, SurveyHeader, SessionDetails, Form, Intro, Disclaimer };
