import React, { Component } from 'react';
import { Button, Spin, Icon } from 'antd';

import Header from '../../common/Header';

import {
  Wrapper,
  Paragraph,
  Content,
  ButtonsWrapper,
} from './Certificate.style';

const antIcon = (
  <Icon type="loading" style={{ fontSize: 24, color: 'white' }} spin />
);

export default class ClaimCertificate extends Component {
  render() {
    const { handleClick, isLoading } = this.props;
    return (
      <Wrapper>
        <Header type="home" userRole="participent" />
        <Content>
          <Paragraph>you can get your certificate by clicking here</Paragraph>
          <ButtonsWrapper>
            <Button type="primary" size="large" block onClick={handleClick}>
              {isLoading && (
                <Spin indicator={antIcon} style={{ marginRight: '.5rem' }} />
              )}
              Claim my certificate
            </Button>
          </ButtonsWrapper>
        </Content>
      </Wrapper>
    );
  }
}
