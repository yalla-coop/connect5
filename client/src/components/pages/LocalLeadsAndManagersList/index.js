import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchManagersNames,
  removeTrainerFromGroupAction,
} from '../../../actions/users';

// STYLING
import {
  Wrapper,
  TopInfo,
  Detail,
  DetailsContent,
  Owner,
  StyledLink,
  Hint,
  LeaveBtn,
} from './LocalLeadsAndManagersList.style';

// ROUTES
import { MY_PROFILE_URL } from '../../../constants/navigationRoutes';

//  COMMON COMPONENTS
import Header from '../../common/Header';
import Spin from '../../common/Spin';

class LocalLeadsAndManagersList extends Component {
  state = {};

  componentDidMount() {
    const { fetchManagersNames: fetchManagersNamesActionCreator } = this.props;
    fetchManagersNamesActionCreator();
  }

  removeTrainerFromGroup = managerId => {
    const {
      removeTrainerFromGroupAction: removeTrainerFromGroupActionCreator,
    } = this.props;
    removeTrainerFromGroupActionCreator(managerId);
  };

  render() {
    const { trainerManagers, localLead } = this.props;

    const filterOfficalLocalLead = trainerManagers.filter(manager => {
      return manager._id !== localLead;
    });

    const [officialLocalLead] = trainerManagers.filter(manager => {
      return manager._id === localLead;
    });

    if (!filterOfficalLocalLead.length && !officialLocalLead) {
      return <Spin />;
    }
    return (
      <Wrapper>
        <Header type="section" label="Manage My Groups" />
        <TopInfo>
          <p>
            Certain Connect 5 Trainers and Local Leads may add you to their
            trainer group. This allows them to set up sessions for you and view
            your results to help with reporting.
          </p>
          <p>Below are the trainer groups you are part of:</p>
        </TopInfo>
        <DetailsContent>
          <Detail>Local Lead Group</Detail>
          <Owner>Owner: {officialLocalLead && officialLocalLead.name}</Owner>
          <Hint>
            It is required that you are part of your Local Lead’s group. If they
            are not your Local Lead any more, please edit your Local Lead in
            your{' '}
            <StyledLink to={MY_PROFILE_URL} target="_blank">
              <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                {' '}
              </span>
            </StyledLink>
          </Hint>
        </DetailsContent>
        {filterOfficalLocalLead &&
          filterOfficalLocalLead.map(item => {
            return (
              <DetailsContent>
                <Detail>Trainer Group</Detail>
                <Owner>Owner: {item.name}</Owner>
                <LeaveBtn onClick={() => this.removeTrainerFromGroup(item._id)}>
                  <i className="fas fa-times" style={{ marginRight: '10px' }} />
                  Leave This Group
                </LeaveBtn>
              </DetailsContent>
            );
          })}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    userName: state.auth.name,
    email: state.auth.email,
    userId: state.auth.id,
    role: state.auth.role,
    organization: state.auth.organization,
    region: state.auth.region,
    localLead: state.auth.localLead,
    localLeadsList: state.fetchedData.localLeadsList,
    updateUserLoading: state.loading.updateUserLoading,
    deleteAccountLoading: state.loading.deleteAccountLoading,
    officialLocalLead: state.auth.officialLocalLead,
    managers: state.auth.managers,
    trainerManagers: state.fetchedData.trainerManagers,
  };
};

export default connect(
  mapStateToProps,
  { fetchManagersNames, removeTrainerFromGroupAction }
)(LocalLeadsAndManagersList);
