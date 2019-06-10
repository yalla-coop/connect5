import styled from 'styled-components';

import { colors, borders } from '../../../theme';

const CommonStyles = styled.div`
  margin-bottom: 3rem;

  h4 {
    margin-bottom: 0;
  }

  header {
    p {
      margin-top: 0.5rem;
    }
  }
  .helpertext {
    opacity: 0.8;
    size: 1rem;
  }
`;

const RadioField = styled(CommonStyles)`
  .other-div {
    justify-self: center;
    #other {
      position: relative;
      opacity: 1;
      justify-self: center;
    }
  }
  h3 {
    font-size: 1.5rem;
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
        align-items: center;
        position: relative;
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

const TextField = styled(CommonStyles)`
  margin-top: 1rem;
  input {
    border-radius: 1rem;
    border: 1px solid ${colors.gray};
    width: 90%;
  }
  h3 {
    font-size: 1.5rem;
  }

  textarea {
    border-radius: 1rem;
    border: 1px solid ${colors.gray};
    width: 100%;
    padding: 8px;
  }
`;

const NumberSliderDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Slider = styled.input`
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
  }
`;

const NumberOutput = styled.output`
  margin-top: 10px;
  font-size: 1rem;
  font-weight: 300;

  -moz-border-radius: 0.8em;
  -webkit-border-radius: 0.8em;
  color: ${colors.black};
  line-height: 1.6em;
  width: 1.6em;
`;

const QuestionCategory = styled.i`
  font-size: 1rem;
`;

export const ErrorDiv = styled.div`
  margin-bottom: 20px;
`;

export {
  QuestionCategory,
  Slider,
  RadioField,
  TextField,
  NumberOutput,
  NumberSliderDiv,
};
