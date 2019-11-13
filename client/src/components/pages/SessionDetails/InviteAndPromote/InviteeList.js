import React, { Component } from 'react';
import { connect } from 'react-redux';

// ANTD COMPONENTS
import { Select, Tooltip, Button as AntButton } from 'antd';
// Actions
import { fetchSessionDetails } from '../../../../actions/groupSessionsAction';
import { updateSessionAttendeesList } from '../../../../actions/sessionAction';

// COMMON COMPONENTS
import Header from '../../../common/Header';
import Button from '../../../common/Button';
import UserManual from '../UserManual';

import { SelecetWrapper, IconsWrapper } from '../SessionDetails.Style';

// STYLE
import { InviteSectionWrapper, Form, InputDiv } from './InviteAndPromote.style';

const { Option } = Select;

class InviteeList extends Component {
  state = {
    err: ''
  };

  componentDidMount() {
    let dT = null;
    try {
      dT = new DataTransfer();
    } catch (e) {
      // ignore the error
    }
    const evt = new ClipboardEvent('paste', { clipboardData: dT });
    if (evt.clipboardData || window.clipboardData) {
      (evt.clipboardData || window.clipboardData).setData('text/plain', '');

      document.addEventListener('paste', this.pasteEmails);

      document.dispatchEvent(evt);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('paste', this.pasteEmails);
  }

  render() {
    const { err } = this.state;
    const {
      loading,
      onCopy,
      onClear,
      onSelectBlur,
      onSelectFocus,
      handleSubmitUpdateAttendees,
      handleUpdateAttendees,
      participantsEmails = [],
    } = this.props;

    return (
      <>
        <InviteSectionWrapper>
          <Header type="view" label="Invitee List" />
          <UserManual />
          <Form>
            <InputDiv>
              <SelecetWrapper>
                <IconsWrapper>
                  <Tooltip placement="top" title="Copy">
                    <AntButton
                      type="primary"
                      icon="copy"
                      ghost
                      onClick={() => onCopy('new')}
                      disabled={!participantsEmails.length}
                    />
                  </Tooltip>
                  <Tooltip placement="top" title="Delete">
                    <AntButton
                      type="danger"
                      icon="delete"
                      ghost
                      onClick={() => onClear('new')}
                      disabled={!participantsEmails.length}
                    />
                  </Tooltip>
                </IconsWrapper>
                <Select
                  mode="tags"
                  size="large"
                  placeholder="emails"
                  onChange={values => handleUpdateAttendees(values, 'new')}
                  value={participantsEmails}
                  style={{ width: '100%', height: '100%' }}
                  onBlur={onSelectBlur}
                  onFocus={onSelectFocus}
                >
                  {participantsEmails &&
                    participantsEmails.map(email => (
                      <Option key={email} value={email}>
                        {email}
                      </Option>
                    ))}
                </Select>
              </SelecetWrapper>
            </InputDiv>
            <div>{err}</div>

            <InputDiv>
              <Button
                type="primary"
                style={{
                  width: '100%',
                  marginTop: '2rem',
                  fontSize: '19px',
                  fontWeight: 'bold',
                  padding: '0.5rem 1rem',
                  height: 'auto',
                }}
                onClick={() => handleSubmitUpdateAttendees('new')}
                disabled={loading}
                loading={loading}
                label="Update"
              >
                Update
              </Button>
            </InputDiv>
          </Form>
        </InviteSectionWrapper>
      </>
    );
  }
}

const mapStateToProps = state => {
  const {
    sessionDetails: [sessionDetails],
  } = state.sessions;

  return {
    sessionDetails,
    loading: state.session.loading,
  };
};

export default connect(
  mapStateToProps,
  { fetchSessionDetails, updateSessionAttendeesList }
)(InviteeList);
