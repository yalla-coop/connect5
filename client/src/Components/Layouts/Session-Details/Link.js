import React, { Component } from "react";
import swal from "sweetalert";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Span2, Span1, LinkType, SurveyType, LinkInfo, Btn, copyLink,
} from "./styledComponents";

class Link extends Component {
  handleInfo = () => {
    swal({
      icon: "info",
      text:
        "Please copy and send the survey link to all participants. You will see the survey results for your session as soon as they are being submitted",
    });
  };

  handleCopy = () => {
    swal("Link copied!", "", "success");
  };

  render() {
    const {
      type, onCopy, saveInState, surveyURL, value,
    } = this.props;
    return (
      <LinkType>
        <Span1>
          <SurveyType>{type}</SurveyType>
          Link
        </Span1>
        <Span2 onClick={this.handleInfo}>
          <i className="fas fa-info-circle" />
          <LinkInfo>info</LinkInfo>
        </Span2>
        <copyLink>
          <CopyToClipboard onCopy={onCopy} text={value} style={{ cursor: "pointer" }}>
            <Btn
              onClick={() => {
                saveInState(surveyURL);
                this.handleCopy();
              }}
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
