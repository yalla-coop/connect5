import React from 'react';
import {
  ThankYouWrapper,
  ThankYouMsg,
  Paragraph,
  StyledLink,
} from './ThankYou.style';
import Button from '../../common/Button';

const ThankYouPage = () => {
  return (
    <ThankYouWrapper>
      <ThankYouMsg>Thank you for filling the survey</ThankYouMsg>
      <Paragraph>you can get your certificate by clicking here</Paragraph>
      <StyledLink to="/">
        <Button
          type="primary"
          label="Claim my certificate"
          width="200px"
          height="50px"
          style={{
            padding: '10px 14px',
            textTransform: 'none',
          }}
        />
      </StyledLink>
    </ThankYouWrapper>
  );
};

export default ThankYouPage;
