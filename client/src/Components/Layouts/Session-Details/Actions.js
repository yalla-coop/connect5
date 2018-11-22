import React, { Component } from "react";
import axios from "axios";
import {
  Actions, Action, ActionBtn, Span, Icon,
} from "./styledComponents";


class SessionActions extends Component {
  deleteSession = (_id) => {
    axios
      .get(`/deleteSession/${_id}`)
      .then((res) => {
      })
      .catch(err => this.context.router.history.push("/server-error"));
  }


  render() {
    const { sessionDetails } = this.props;
    const { _id } = sessionDetails;
    return (
      <Actions>
        <Action>
          <ActionBtn type="button"><Icon className="far fa-edit" /></ActionBtn>
          <Span>edit session</Span>
        </Action>
        <Action>
          <ActionBtn type="button" onClick={() => this.deleteSession(_id)}><Icon className="fas fa-trash-alt" /></ActionBtn>
          <Span>delete session</Span>
        </Action>
      </Actions>
    );
  }
}

export default SessionActions;
