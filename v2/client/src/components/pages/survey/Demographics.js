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
        <SectionCategory>Demographic Data</SectionCategory>
        <TextField>Servus</TextField>
        {renderSkipButtons}
      </QuestionWrapper>
    );
  }
}
