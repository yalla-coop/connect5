import styled from "styled-components";
import { Link } from "react-router-dom";

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

const Paragraph = styled.p`
  color: gray;
  font-weight: 100;
  margin-top: 50px;
  font-size: 0.85em
  text-align: justify;
  color: var(--paragraph-color);
  margin-bottom: 40px
`;

const Button = styled(Link)`
  background: none;
  line-height: 35px;
  margin: 10px 0;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.4em
  color: black;
  text-decoration: none;
  background-color: var(--button-background-color);
  color: var(--button-text-color);
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
  Button, Paragraph, Heading, Container, Form, Input, Error,
};
