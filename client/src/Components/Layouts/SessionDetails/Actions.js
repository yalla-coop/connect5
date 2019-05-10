import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";
import PropTypes from "prop-types";
import {
  ActionsWrapper, ActionWrapper, ActionBtn, Span, Icon,
} from "./styledComponents";

class SessionActions extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };


  handleEdit = (session) => {
    const { getCurrentSession } = this.props;
    const { router } = this.context;

    getCurrentSession(session);
    router.history.push("/edit-session");
  };

  deleteSession = (_id) => {
    swal({
      icon: "warning",
      text: "Are you sure that you want to delete this session?",
      button: {
        text: "Delete!",
        closeModal: false,
      },
      dangerMode: true,
    })
      .then((willDelete) => {
        const { router } = this.context;

        if (willDelete) {
          axios
            .get(`/deleteSession/${_id}`)
            .then(
              swal("This session has been successfully deleted ").then(() => router.history.push("/view-sessions")),
            );
        }
      })
      .catch(() => {
        swal("Oops!", "Seems like we couldn't fetch the info");
      });
  };

  render() {
    const { sessionDetails } = this.props;
    const { handleEdit } = this;
    const { _id } = sessionDetails;
    return (
      <ActionsWrapper>
        <ActionWrapper>
          <ActionBtn type="button" onClick={() => handleEdit(sessionDetails)}>
            <Icon className="far fa-edit" style={{ color: "#1d5d90" }} />
          </ActionBtn>
          <Span style={{ color: "#1d5d90" }}>edit session</Span>
        </ActionWrapper>
        <ActionWrapper>
          <ActionBtn type="button" onClick={() => this.deleteSession(_id)}>
            <Icon className="fas fa-trash-alt" style={{ color: "#f12222f2" }} />
          </ActionBtn>
          <Span style={{ color: "#f12222f2" }}>delete session</Span>
        </ActionWrapper>
      </ActionsWrapper>
    );
  }
}

export default SessionActions;
