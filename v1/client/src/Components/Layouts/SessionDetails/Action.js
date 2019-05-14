import React, { Component } from "react";
import {
  ActionsWrapper,
  ActionWrapper,
  ActionBtn,
  Span,
  Icon,
} from "./styledComponents";

class Actions extends Component {
  render(){
    const { handleEdit, deleteSession, _id } = this.props;
    return(
      <ActionsWrapper>
        <ActionWrapper>
          <ActionBtn type="button" onClick={()=> handleEdit()}><Icon className="far fa-edit" /><Span>edit session</Span></ActionBtn>
        </ActionWrapper>
        <ActionWrapper>
          <ActionBtn type="button" onClick={() => deleteSession(_id)}><Icon className="fas fa-trash-alt" /><Span>delete session</Span></ActionBtn>
        </ActionWrapper>
      </ActionsWrapper>
    )
  }
}

  export default Actions;
