import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Contianer = styled.div`

`;
const Heading = styled.h1`

`;

const Form = styled.form`
  background:none;
  color: red
`;

const Input = styled.input`
  
`;


const CreateSession = () => (
  <Contianer>
    <Heading>
      Create New Session
    </Heading>
    <Form>
      <Input type="input" />

    </Form>
  </Contianer>
);
export default CreateSession;
