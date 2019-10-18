import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { Icon } from 'antd';
import { deleteSessionAction } from '../../../../actions/groupSessionsAction';
import {
  SessionActionsWrapper,
  SessionAction,
  SessionEdit,
  SessionDelete,
  IconName,
} from './SessionActions.Style';

class SessionActions extends Component {
  deleteSession = _id => {
    const { deleteSessionAction: deleteSession } = this.props;

    Swal.fire({
      title: 'Are you sure that you want to delete this session?',
      text: "You won't be able to revert this!",
      type: 'warning',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    })
      .then(willDelete => {
        if (willDelete.value) {
          deleteSession(_id);
        }
      })
      .catch(() => {
        Swal.fire('Oops!', 'Something error in deleting this session');
      });
  };

  render() {
    const { sessionDetails, isMobile } = this.props;
    const { _id } = sessionDetails;
    const { deleteSession } = this;
    return (
      <SessionActionsWrapper>
        <SessionAction>
          <SessionEdit to={`/session-edit/${_id}`}>
            <Icon
              type="edit"
              style={{ width: '2rem', height: '2rem', color: '#08c' }}
            />
            <IconName>Edit {!isMobile && 'Session'}</IconName>
          </SessionEdit>
        </SessionAction>

        <SessionAction>
          <SessionDelete onClick={() => deleteSession(_id)}>
            <Icon
              type="delete"
              style={{ width: '2rem', height: '2rem', color: 'red' }}
            />
            <IconName>Delete {!isMobile && 'Session'}</IconName>
          </SessionDelete>
        </SessionAction>
      </SessionActionsWrapper>
    );
  }
}

const mapStateToProps = state => ({
  msg: state.session.msg,
  role: state.auth.role,
  isMobile: state.checkBrowserWidth.isMobile,
});

export default connect(
  mapStateToProps,
  { deleteSessionAction }
)(SessionActions);
