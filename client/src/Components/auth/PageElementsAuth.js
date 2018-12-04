import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 85px auto !important;
  text-align: center;
  height: 100%;
  max-width: 355px;
`;

const Heading = styled.h1`
  font-size: 1.7em;
  margin: 20px auto;
  color: var(--main-heading);
`;

const Form = styled.form`
  background: none;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  padding: 15px 14px;
  background-color: var(--form-background);
  border-radius: 15px;
  border: 1px solid var(--light-gray-border);
`;

const Input = styled.input`
  height: 50px;
  border-radius: 4px;
  outline: none;
  margin: 13px 0;
  border: 1px solid var(--light-gray-border);
  padding-left: 25px;
  ${({ submit }) => submit
   &&
   ` background-color: var(--large-button-background);
    color: var(--large-button-text);
    font-weight: 900;
    font-size: 24px;
    border:none;`
}
`;

const Error = styled.p`
  color: red;
  padding: 0;
  margin: 5px auto 0;
`;

export {
  Heading, Container, Form, Input, Error,
};
