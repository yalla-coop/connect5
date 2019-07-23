import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../common/Header';

import { Wrapper, Title, WhiteDiv, Text, Row } from './SessionsFiles.style';

const SessionsFiles = () => {
  return (
    <div>
      <Header label="Materials" type="section" />
      <Wrapper>
        <Title>Sessions files</Title>
        <WhiteDiv>
          <Row>
            <Text bold>Session 1</Text>
            <Text>Date: 15 - 152 </Text>
          </Row>
          <Row>
            <Text>Session-flkdsjfl.pdf</Text>
            <Link to="/file-name.pdf" download>
              <Text bold>download</Text>
            </Link>
          </Row>
        </WhiteDiv>
      </Wrapper>
    </div>
  );
};

export default SessionsFiles;
