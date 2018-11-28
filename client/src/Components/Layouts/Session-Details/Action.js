import React, { Component } from "react";
import {
  Actions,
  Action,
  ActionBtn,
  Span,
  Icon,
} from "./styledComponents";

class Actions extends Component {
  render(){
    const { handleEdit, deleteSession, _id } = this.props;
    return(
      <Actions>
        <Action>
          <ActionBtn type="button" onClick={()=> handleEdit()}><Icon className="far fa-edit" /><Span>edit session</Span></ActionBtn>
        </Action>
        <Action>
          <ActionBtn type="button" onClick={() => deleteSession(_id)}><Icon className="fas fa-trash-alt" /><Span>delete session</Span></ActionBtn>
        </Action>
      </Actions>
    )
  }

  export default Actions;
