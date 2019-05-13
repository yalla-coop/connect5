
import Select from "react-select";
import styled from "styled-components";
import DatePicker from "react-datepicker";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  margin: 20px auto;
  max-width: 600px;
  margin-bottom: 80px;
`;
const Heading = styled.h1`
  color: var( --main-heading);
  font-size: 28px;
  text-align: center;
  font-weight: 900
`;

const Form = styled.form`
  background:none;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 10px auto;
  padding: 15px 14px;
  background-color: var(--form-background);
  border-radius: 15px;
  border: 1px solid var(--light-gray-border)
`;

const Input = styled.input`
  height: 50px;
  border-radius: 4px;
  outline: none;
  margin: 13px 0;
  border: 1px solid var(--light-gray-border);
  padding-left: 25px;
`;

const Date = styled(DatePicker)`
  height: 50px;
  border-radius: 4px;
  outline: none;
  margin: 13px 0;
  border: 1px solid var(--light-gray-border);
  padding-left: 25px;
  width: 100%;
`;

const Button = styled.button`
  line-height: 50px;
  margin: 15px 0;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.4em
  color: black;
  text-decoration: none;
  background-color: var(--large-button-background);
  color: var(--large-button-text);
  outline: none;
  border: none;
`;
const SelectComponent = styled(Select)`
  > :first-child{
    height: 50px;
    border-radius: 5px;
    border: 1px solid var(--light-gray-border);
    margin: 13px 0;
  }
`;

const Error = styled.p`
  color: red;
  padding: 0;
  margin: 20px auto 0;
`;

export {
  Container,
  Heading,
  Form,
  Input,
  Button,
  SelectComponent,
  Date,
  Error,
};
