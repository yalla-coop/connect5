import styled from 'styled-components';

import { colors, borders, shadows } from '../../../theme';

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
  padding: 1rem 1rem;
  box-shadow: ${shadows.primary};
`;

export const RadioField = styled(CommonStyles)`
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
  padding-top: 1rem;
  input,
  .ant-calendar-picker {
    border-radius: 1rem;
    border: 1px solid ${colors.gray};
    width: 100% !important;
    padding: 0.5rem 1rem;
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
`;

export const StyledUL = styled.ul`
  margin-left: 1rem;
`;
