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
            padding: '12px 14px',
            borderRadius: '20px',
            textTransform: 'none',
            fontWeight: '400',
          }}
          disabled
        />
      </StyledLink>
    </ThankYouWrapper>
  );
};

export default ThankYouPage;
