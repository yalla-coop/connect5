import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Span2,
  Span1,
  LinkType,
  SurveyType,
  LinkInfo,
  Btn,
  copyLink,
} from "./styledComponents";

class Link extends Component {
  render() {
    const {
      type, onCopy, saveInState, surveyURL1, value,
    } = this.props;
    return (
      <LinkType>
        <Span1>
          Survey
          <SurveyType>{type}</SurveyType>
          Link
        </Span1>
        <Span2>
          <i className="fas fa-info-circle" />
          <LinkInfo>info</LinkInfo>
        </Span2>
        <copyLink>
          <CopyToClipboard onCopy={onCopy} text={value}>
            <Btn
              onClick={() => saveInState(surveyURL1)}
            >
              <i className="far fa-clone" />
              <LinkInfo>copy</LinkInfo>
            </Btn>
          </CopyToClipboard>
        </copyLink>
      </LinkType>
    );
  }
}

export default Link;
