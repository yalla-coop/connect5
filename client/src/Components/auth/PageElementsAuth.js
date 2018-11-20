import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  text-align: center;
  height: 100%;
  margin-top: 120px;
`;

const Heading = styled.h1`
  font-size: 1.7em;
  margin: 0 auto;
  color: var(--heading-color);
`;

const Form = styled.form`
  background: none;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  padding: 15px 14px;
  background-color: #ececec;
  border-radius: 15px;
  border: 1px solid var(--border-color);
`;

const Input = styled.input`
  height: 50px;
  border-radius: 4px;
  outline: none;
  margin: 13px 0;
  border: 1px solid var(--border-color);
  padding-left: 25px;
`;

const Error = styled.p`
  color: red;
  padding: 0;
  margin: 5px auto 0;
`;

export {
  Heading, Container, Form, Input, Error,
};
