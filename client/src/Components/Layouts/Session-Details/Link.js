import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Span2,
  Span1,
  LinkType,
  LinkInfo,
  Btn,
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
          {type}
          Link
        </Span1>
        <Span2>
          <i className="fas fa-info-circle" />
          <LinkInfo>info</LinkInfo>
        </Span2>
        <Span2>
          <CopyToClipboard onCopy={onCopy} text={value}>
            <Btn onClick={() => saveInState(surveyURL1)}>
              <i className="far fa-clone" />
              <LinkInfo>copy</LinkInfo>
            </Btn>
          </CopyToClipboard>
        </Span2>
      </LinkType>
    );
  }
}

export default Link;
