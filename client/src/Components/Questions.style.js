import styled from "styled-components";

const RadioField = styled.div`
  .answers {
    display: flex;
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
        padding-left: 35px;
        width: 100%;
      }

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        display: flex;
        align-items: center;
      }

      .checkmark {
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #eee;
        border-radius: 50%;
        position: absolute;

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
        background-color: var(--heading-color);
      }

      input:checked ~ .checkmark:after {
        display: block;
      }

      .checkmark:after {
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

const TextField = styled.div`
  input {
    border-radius: 1rem;
    border: 1px solid var(--heading-color);
    width: 100%;
    padding: 8px;
  }
`;

// const RadioStarField = styled.div`
//   background: red;

//   .rate:not(:checked) > input {
//     position: absolute;
//     top: -9999px;
//   }

//   .rate:not(:checked) > label {
//     float: right;
//     width: 1em;
//     overflow: hidden;
//     white-space: nowrap;
//     cursor: pointer;
//   }
// `;

const RadioStarField = styled(RadioField)``;

export { RadioField, TextField, RadioStarField };
