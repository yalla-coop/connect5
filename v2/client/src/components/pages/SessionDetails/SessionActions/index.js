import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { Icon } from 'antd';
import history from '../../../../history';
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

          Swal.fire({
            title: 'success',
            text: 'session has been successfully delete',
            type: 'success',
            confirmButtonText: 'Ok',
          });
          history.push('/sessions');
        }
      })
      .catch(() => {
        Swal.fire('Oops!', 'Something error in deleting this session');
      });
  };

  render() {
    const { sessionDetails, msg } = this.props;
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
            <IconName>Edit Session</IconName>
          </SessionEdit>
        </SessionAction>

        <SessionAction>
          <SessionDelete onClick={() => deleteSession(_id, msg)}>
            <Icon
              type="delete"
              style={{ width: '2rem', height: '2rem', color: 'red' }}
            />
            <IconName>Delete Session</IconName>
          </SessionDelete>
        </SessionAction>
      </SessionActionsWrapper>
    );
  }
}

const mapStateToProps = state => ({
  msg: state.session.msg,
});

export default connect(
  mapStateToProps,
  { deleteSessionAction }
)(SessionActions);
