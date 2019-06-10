import styled from 'styled-components';
import { colorCodes, borders } from '../../../theme';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding-top: 50px;
`;

const SurveyQs = styled.div`
  main {
    padding: 0 8px;
    // background: ${colorCodes.offWhite};
  }
`;

const SessionDetails = styled.div`
  span {
    font-weight: 300;
  }
  h3 {
    font-size: 2rem;
    font-weight: 300;
  }
  ul {
    text-align: right;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  margin: 1rem 0;
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

export { SurveyQs, SessionDetails, Form, Disclaimer };
