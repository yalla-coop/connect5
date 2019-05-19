import styled from 'styled-components';

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

  .answers {
    display: flex;
    cursor: pointer;
    position: relative;
    flex-wrap: wrap;

    div {
      display: flex;
      /* flex-direction: row; */
      min-width: 50%;
      /* max-width: 80%; */
      cursor: pointer;
      position: relative;
      /* padding: 0.5rem 0 0.5rem 0; */
      /* -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none; */

      label {
        cursor: pointer;
        /* padding-left: 35px;
        width: 100%; */
        display: flex;
        align-items: center;
        position: relative;
        /* position: relative; */
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
          background-color: #ccc;
        }

        :checked ~ .checkmark {
          background-color: black;
          border: 8px solid var(--heading-color);
        }
      }

      .checkmark {
        /* top: 0;
        left: 0; */
        height: 25px;
        width: 25px;
        background-color: #eee;
        border-radius: 50%;
        display: block;

        /* :after {
          content: "";
          position: absolute;
          display: none;
        } */
      }
    }
  }
`;

const TextField = styled(CommonStyles)`
  input,
  textarea {
    border-radius: 1rem;
    border: 1px solid var(--heading-color);
    width: 100%;
    padding: 8px;
  }
`;

const Slider = styled.input`
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    width: 10px;
    -webkit-appearance: none;
    height: 10px;
    cursor: ew-resize;
    background: #434343;
  }

  &::-webkit-slider-runnable-track {
    border: 1px solid black;
  }
`;

export { Slider, RadioField, TextField };
