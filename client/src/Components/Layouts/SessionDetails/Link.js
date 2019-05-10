import React, { Component } from "react";
import swal from "sweetalert";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Span2, Span1, LinkType, Btn, CopyLink, IconsContainer, I,
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
    swal({
      timer: 1500,
      icon: "success",
      text: "Link copied!",
    });
  };

  render() {
    const {
      type, onCopy, saveInState, surveyURL, value,
    } = this.props;
    return (
      <LinkType>
        <Span1>
          {type}
          {" "}
Link
        </Span1>

        <IconsContainer>
          <Span2 onClick={this.handleInfo}>
            <I className="fas fa-info-circle" />
          </Span2>
          <CopyLink>
            <CopyToClipboard onCopy={onCopy} text={value} style={{ cursor: "pointer" }}>
              <Btn
                onClick={() => {
                  saveInState(surveyURL);
                  this.handleCopy();
                }}
              >
                <I className="far fa-clone" />
              </Btn>
            </CopyToClipboard>
          </CopyLink>
        </IconsContainer>
      </LinkType>
    );
  }
}

export default Link;
