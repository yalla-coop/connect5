import React, { Component } from 'react';
 
import {
  TextField,
  QuestionWrapper,
  SectionCategory,
  Warning,
} from './Questions.style';

export default class EnterPIN extends Component {
  render() {
    const {
      renderSkipButtons,
      handlePIN,
      onPINBlur,
      PINerror,
      PIN,
      PINvalid,
      completionRate,
    } = this.props;
    return (
      <QuestionWrapper>
        <SectionCategory>Please enter your PIN</SectionCategory>
        <TextField>
          <header>
            <p>
              {` We want to create a PIN code so that we can link your responses to
              this survey with your responses to other Connect 5 surveys, whilst
              you remain entirely anonymous. In order to do that, `}
              <strong>
                {` please type in the third letter of your first name, the first
                two letters of your mother's first name and the date you were
                born `}
              </strong>
              (e.g., you would type 01 if you were born on the 1st July)
            </p>
          </header>
          {/* {checkPINerror(errors)} */}
          <input
            id="PIN"
            name="PIN"
            type="text"
            maxLength="5"
            minLength="5"
            onChange={handlePIN}
            onBlur={onPINBlur}
            onFocus={onPINBlur}
            disabled={PINvalid && completionRate > 0}
            value={PIN.length > 0 ? PIN : ''}
          />
          {PINerror.length > 0 && <Warning>* {PINerror}</Warning>}
        </TextField>
        {renderSkipButtons}
      </QuestionWrapper>
    );
  }
}
