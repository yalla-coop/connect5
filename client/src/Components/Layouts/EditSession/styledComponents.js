import Select from "react-select";
import styled from "styled-components";
import DatePicker from "react-datepicker";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  margin-bottom: 72px;
  @media (min-width:1040px) {
    width: 40%;
    margin: 0 auto;
    top: 100px
  }
`;
const Heading = styled.h1`
  color: #0B6FA4;
  font-size: 28px;
  text-align: center;
  font-weight: 900
`;

const Form = styled.form`
  background:none;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  padding: 15px 14px;
  background-color: #ECECEC;
  border-radius: 15px;
  border: 1px solid #42C4DE;
  @media (min-width:1040px) {
    margin: 0 auto;
    top: 40%
  }
`;

const Input = styled.input`
  height: 50px;
  border-radius: 4px;
  outline: none;
  margin: 13px 0;
  border: 1px solid #42C4DE;
  padding-left: 25px;
`;

const Date = styled(DatePicker)`
  height: 50px;
  border-radius: 4px;
  outline: none;
  margin: 13px 0;
  border: 1px solid #42C4DE;
  padding-left: 25px;
  width: 100%;
`;

const Button = styled.button`
  line-height: 50px;
  margin: 15px 0;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.2em
  color: #fff;
  text-decoration: none;
  background-color:#42C4DE;
  outline: none;
  border: none;
`;
const SelectComponent = styled(Select)`
  > :first-child{
    height: 50px;
    border-radius: 5px;
    border: 1px solid #42C4DE;
  }
`;

export {
  Container,
  Heading,
  Form,
  Input,
  Button,
  SelectComponent,
  Date,
};
