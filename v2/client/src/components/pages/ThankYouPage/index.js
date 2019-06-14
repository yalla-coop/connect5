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
      <Paragraph>
        you can now log in using your PIN and view your behavioural insight
        results
      </Paragraph>
      <StyledLink to="/participant-login">
        <Button
          type="primary"
          label="View Results."
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
