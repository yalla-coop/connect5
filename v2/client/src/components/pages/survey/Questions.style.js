import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors, borders, shadows, breakpointsMax } from '../../../theme';

export const CommonStyles = styled.div`
  margin-bottom: 3rem;

  h4 {
    margin-bottom: 0;
    font-weight: 400;
    color: ${colors.black};
  }

  header {
    p {
      margin-top: 0.5rem;
    }
  }
  .helpertext {
    opacity: 0.8;
    font-size: 1rem;
    font-style: italic;
  }
`;

export const SubGroup = styled.p`
  font-size: 1.125;
  font-weight: 500;
`;

export const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  margin: 1rem 0;
  padding: 2rem 2rem 0 2rem;
  box-shadow: ${shadows.primary};
  opacity: ${props => props.disabled && '0.3'};
  pointer-events: ${props => props.disabled && 'none'};

  @media ${breakpointsMax.tablet} {
    padding: 1rem 1rem 0 1rem;
  }
`;

export const QuestionGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RadioField = styled(CommonStyles)`
  margin-bottom: 1rem;
  .other-div {
    justify-self: center;
    #other {
      position: relative;
      opacity: 1;
      justify-self: center;
    }
  }
  h4 {
    font-size: 1rem;
    ${({ unanswered }) => unanswered && ` color: ${colors.errorRed}`}
  }

  p {
    ${({ unanswered }) => unanswered && ` color: ${colors.errorRed}`}
  }

  .answers {
    display: flex;
    cursor: pointer;
    position: relative;
    flex-wrap: wrap;

    div {
      display: flex;
      min-width: 50%;
      cursor: pointer;
      position: relative;

      label {
        cursor: pointer;
        display: flex;
        /* align-items: center; */
        position: relative;
        width: 100%;
        text-transform: capitalize;
      }

      p {
        padding-left: 16px;
        max-width: 75%;
      }

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 25px;
        width: 25px;

        :hover ~ .checkmark {
          background-color: ${colors.extralightPrimary};
        }

        :checked ~ .checkmark {
          border: 3px solid ${colors.primary};
        }
      }

      .checkmark {
        border: 0.5px solid ${colors.transGray};
        height: 25px;
        width: 25px;
        background-color: ${colors.transGray};
        border-radius: 50%;
        display: block;
      }
    }
  }
`;

export const TextField = styled(CommonStyles)`
  padding: 1rem;
  margin-bottom: 1rem;
  input {
    border-radius: 1rem;
    border: 1px solid ${colors.gray};
    width: 100% !important;
    padding: 0.5rem 1rem;
  }

  .ant-calendar-picker {
    border-radius: 1rem;
    border: 1px solid ${colors.gray};
    width: 100% !important;
    /* padding: 0.5rem 1rem; */

    input {
      border: none;
    }
  }

  h4 {
    font-size: 1rem;
    ${({ unanswered }) => unanswered && ` color: ${colors.errorRed}`}
  }

  p {
    ${({ unanswered }) => unanswered && ` color: ${colors.errorRed}`}
  }

  textarea {
    border-radius: 1rem;
    border: 1px solid ${colors.gray};
    width: 100%;
    padding: 8px;
  }
`;

export const Warning = styled.p`
  color: ${colors.errorRed};
  font-size: 14px;
  opacity: 0.6;
  padding-top: 1rem;
`;

export const NumberSliderDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Slider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 25px;
  border: ${borders.inputBox};

  ::-webkit-slider-thumb {
    width: 20px;
    -webkit-appearance: none;
    height: 20px;
    border-radius: 10px;
    cursor: ew-resize;
    background: ${colors.primary};
    ${({ unanswered }) => unanswered && 'background: red;'}
  }
`;

export const RateDiv = styled.div`
  display: flex;
  justify-content: center;

  .ant-rate {
    font-size: 32px !important;
  }

  .anticon-star {
    font-size: 32px !important;
    svg {
      width: 2em !important;
      height: 2em !important;
    }
  }
`;

export const NumberOutput = styled.output`
  margin-top: 10px;
  font-size: 1rem;
  font-weight: 300;
  color: ${colors.primary};

  border-radius: 0.8em;
  -moz-border-radius: 0.8em;
  -webkit-border-radius: 0.8em;
  /* color: ${colors.black}; */
  line-height: 1.6em;
`;

export const SectionCategory = styled.h4`
  font-size: 1.5rem;
  font-weight: 300;
  text-transform: capitalize;
  margin-bottom: 0.5rem;
  color: ${colors.primary};
  padding: 2rem 1rem 0 1rem;
`;

export const StyledUL = styled.ul`
  padding-left: 1rem;
  padding-bottom: 1rem;
`;

export const InfoHeader = styled(Link)`
  font-size: 14px;
  font-weight: 300;
  color: ${colors.black};
  text-decoration: italic;
  margin: 0;
  padding: 0.5rem 1rem;

  :hover {
    color: ${colors.primary};
  }
`;

export const StyledIframe = styled.div`
  position: relative;
  height: 0;
  padding-bottom: 56.25%;
  padding-top: 25px;
  margin-bottom: 1rem;
  max-width: 600px;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
