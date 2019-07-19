import React, { Component } from 'react';

// Styles
import Button from '../../common/Button';

import {
  ButtonDiv,
  SessionDetails,
  SectionHeadline,
  SectionSubHeadline,
  PromptHeadline,
  Paragraph,
  DetailsDiv,
} from './Survey.style';

import { TextField, QuestionWrapper, SectionCategory } from './Questions.style';

export default class EnterPIN extends Component {
  render() {
    const { renderSkipButtons } = this.props;
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
            // onChange={handlePIN}
            // onBlur={onPINBlur}
          />
        </TextField>
        {renderSkipButtons}
      </QuestionWrapper>
    );
  }
}
