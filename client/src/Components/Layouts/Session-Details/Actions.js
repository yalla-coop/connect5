import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Actions,
  Action,
  ActionBtn,
  Span,
  Icon,
} from "./styledComponents";


class SessionActions extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  state = {
    editSession: false,
  }

  handleEdit = () => {
    this.context.router.history.push("/edit-session");
  }

  deleteSession = (_id) => {
    swal({
      text: "Are you sure that you want to delete this session?",
      button: {
        text: "Delete!",
        closeModal: false,
      },
    })
      .then((willDelete) => {
        if (willDelete) {
          return axios
            .get(`/deleteSession/${_id}`)
            .then(
              swal("This session has been successfully deleted ")
                .then(() => this.context.router.history.push("/view-sessions")),
            );
        }
      })
      .catch((err) => {
        swal("Oops!", "Seems like we couldn't fetch the info");
      });
  }

  render() {
    const { sessionDetails } = this.props;
    const { handleEdit } = this;
    const { _id } = sessionDetails;
    return (
      <Actions>
        <Action>
          <ActionBtn type="button" onClick={() => handleEdit()}><Icon className="far fa-edit" /></ActionBtn>
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
