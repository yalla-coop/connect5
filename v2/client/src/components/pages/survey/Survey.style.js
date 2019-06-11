import styled from 'styled-components';
import { colors, colorCodes, borders } from '../../../theme';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 0;
`;

const SurveyQs = styled.div`
  main {
    background: ${colorCodes.offWhite};
  }
`;

const SessionDetails = styled.div`
  padding: 0 0.5rem;

  span {
    font-weight: 300;
  }
  h3 {
    font-size: 2rem;
    font-weight: 300;
  }
  ul {
    text-align: left;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  li {
    text-transform: capitalize;
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

const CompletionRate = styled.p`
  font-weight: 300;
  font-size: 1.5rem;
`;

export {
  SurveyQs,
  SessionDetails,
  Form,
  Disclaimer,
  ProgressWrapper,
  CompletionRate,
};
