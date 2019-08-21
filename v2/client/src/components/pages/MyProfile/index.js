import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';

import { fetchAllTrainers as fetchAllTrainersAction } from '../../../actions/trainerAction';

import { fetchLocalLeads as fetchLocalLeadsAction } from '../../../actions/users';

// STYLING
import {
  Wrapper,
  DetailsContent,
  Detail,
  BoldSpan,
  Row,
} from './MyProfile.style';

//  COMMON COMPONENTS
import Header from '../../common/Header';

const captalizesName = name => name && name[0].toUpperCase() + name.substr(1);

class MyProfile extends Component {
  componentDidMount() {
    const { fetchLocalLeads } = this.props;
    fetchLocalLeads();
  }

  render() {
    const {
      userName,
      role,
      organization,
      region,
      email,
      localLeadsList,
      localLead,
    } = this.props;

    const [trainerLocalLead] = localLeadsList.filter(
      item => item._id === localLead
    );

    const groupedLocalLeads = {};
    localLeadsList.forEach(item => {
      groupedLocalLeads[item.region] = groupedLocalLeads[item.region]
        ? groupedLocalLeads[item.region.toLowerCase()]
        : [];

      groupedLocalLeads[item.region].push(item.name);
    });

    return (
      <Wrapper>
        <Header type="home" />
        <DetailsContent>
          <Row>
            <Detail>
              <BoldSpan>Name: </BoldSpan>
              {captalizesName(userName)}
            </Detail>
          </Row>
          <Row>
            <Detail>
              <BoldSpan>Email: </BoldSpan>
              {email}
            </Detail>
          </Row>
          <Row>
            <Detail>
              <BoldSpan>Role: </BoldSpan>
              {role}
            </Detail>
          </Row>
          <Row>
            <Detail>
              <BoldSpan>Region: </BoldSpan>
              {region || 'N/A'}
            </Detail>
          </Row>

          <Row>
            <Detail>
              <BoldSpan>Organisation: </BoldSpan>
              {organization || 'N/A'}
            </Detail>
            <Detail>
              <BoldSpan>Edit</BoldSpan>
            </Detail>
          </Row>

          <Row>
            <Detail>
              <BoldSpan>Local lead: </BoldSpan>
              {captalizesName(trainerLocalLead && trainerLocalLead.name) ||
                'N/A'}
            </Detail>
            <Detail>
              <BoldSpan>Edit</BoldSpan>
            </Detail>
          </Row>
        </DetailsContent>
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
  };
};

export default connect(
  mapStateToProps,
  { fetchLocalLeads: fetchLocalLeadsAction }
)(MyProfile);
