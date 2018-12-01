import styled from "styled-components";

const CommonStyles = styled.div`
  margin-bottom: 32px;

  h4 {
    margin-bottom: 0;
  }

  header {
    p {
      margin-top: 8px;
    }
  }
  .helpertext {
    opacity: 0.8;
    size: 16px;
  }

  ${({ unanswered }) => unanswered && "color: red;"}
`;

const RadioField = styled(CommonStyles)`
  .answers {
    display: flex;
    cursor: pointer;
    position: relative;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;

    div {
      display: flex;
      flex-direction: row;
      min-width: 50%;
      max-width: 80%;
      cursor: pointer;
      position: relative;
      padding: 0.5rem 0 0.5rem 0;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      label {
        cursor: pointer;
        /* padding-left: 35px;
        width: 100%; */
        display: flex;
        align-items: center;
        position: relative;
      }

      p {
        padding-left: 16px;
        width: 85%;
      }

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 25px;
        width; 25px;
      }

      .checkmark {
        /* top: 0;
        left: 0; */
        height: 25px;
        width: 25px;
        background-color: #eee;
        border-radius: 50%;
        display: block;

        :after {
          content: "";
          position: absolute;
          display: none;
        }
      }

      :hover input ~ .checkmark {
        background-color: #ccc;
      }

      input:checked ~ .checkmark {
        background-color: white;
        border: 8px solid var(--heading-color);
      }

      input:checked ~ .checkmark:after {
        top: 9px;
        left: 9px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: white;
      }

    }
  }
`;

const TextField = styled(CommonStyles)`
  input {
    border-radius: 1rem;
    border: 1px solid var(--heading-color);
    width: 100%;
    padding: 8px;
  }
  ${({ unanswered }) => unanswered && "color: red; input { border: 1px solid red} "}
`;

const MatrixField = styled(CommonStyles)`
  .matrixanswers {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    position: relative;
  }

  .options {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    position: relative;
  }

  label {
    margin: 0 4px 0 4px;
    display: flex;
    align-items: center;

    p {
      padding-left: 16px;
      width: 85%;
    }


  input {
    position: absolute;
    height: 25px;
    width: 25px;
    opacity: 0;
    cursor: pointer;

    :hover ~ .checkmark {
      background-color: #ccc;
    }

    :checked ~ .checkmark {
      background-color: white;
      border: 8px solid var(--heading-color);
    }

    :checked ~ .checkmark:after {
      top: 9px;
      left: 9px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: white;
    }
  }

  .checkmark {
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 50%;
    display: block;

  }
}
`;

const RadioStarField = styled(CommonStyles)`
  .answers {
    display: flex;
    justify-content: space-evenly;
    cursor: pointer;
    position: relative;
  }

  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    input {
      position: absolute;
      height: 25px;
      width: 25px;
      opacity: 0;
      cursor: pointer;

      :hover ~ .checkmark {
        background-color: #ccc;
      }

      :checked ~ .checkmark {
        background-color: white;
        border: 8px solid var(--heading-color);
      }

      :checked ~ .checkmark:after {
        top: 9px;
        left: 9px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: white;
      }
    }

    .checkmark {
      height: 25px;
      width: 25px;
      background-color: #eee;
      border-radius: 50%;
      display: block;

    }
  }
`;

const CheckboxField = styled(CommonStyles)`
  .answers {
    display: flex;
    cursor: pointer;
    position: relative;
    flex-direction: column;
  }

  label {
    display: flex;
    align-items: center;
    position: relative;

    p {
      padding-left: 16px;
      width: 85%;
    }

    input {
      position: absolute;
      height: 25px;
      width: 25px;
      opacity: 0;
      cursor: pointer;

      :hover ~ .checkmark {
        background-color: #ccc;
      }

      :checked ~ .checkmark {
        background-color: white;
        border: 8px solid var(--heading-color);
      }

      :checked ~ .checkmark:after {
        top: 9px;
        left: 9px;
        width: 8px;
        height: 8px;
        border-radius: 8px;
        background-color: white;
      }
    }

    .checkmark {
      height: 25px;
      width: 25px;
      background-color: #eee;
      border-radius: 8px;
      display: block;

      /* :after {
      content: "";
      display: none;
    } */
    }
  }
`;

export {
  RadioField, TextField, RadioStarField, MatrixField, CheckboxField,
};
