import React, { Component } from 'react';
import { Empty } from 'antd';

import moment from 'moment';
import {
  SubDetails,
  WhiteWrapper,
  EmailText,
  BoldSpan,
  ViewMore,
} from '../SessionDetails.Style';

class SpecialRequirements extends Component {
  state = {
    activeIds: {},
  };

  toggleViewMore = e => {
    const { id } = e.target;
    const { activeIds } = this.state;
    this.setState({ activeIds: { ...activeIds, [id]: !activeIds[id] } });
  };

  render() {
    const { specialRequirements } = this.props;
    const { activeIds } = this.state;
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        {specialRequirements && specialRequirements.length ? (
          specialRequirements &&
          specialRequirements.map(specReq => (
            <SubDetails
              key={specReq._id}
              style={{
                padding: '1rem 0',
                borderTop: '1px solid #80808059',
              }}
            >
              <WhiteWrapper>
                <div style={{ marginBottom: '10px' }}>
                  <EmailText black>
                    <BoldSpan black>Date:&#32;</BoldSpan>
                    {moment(specReq.createdAt).format('DD-MM-YYYY')}
                  </EmailText>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <EmailText black>
                    <BoldSpan black>Email:&#32;</BoldSpan>
                    {specReq.email}
                  </EmailText>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <BoldSpan black>Requirements / Message:&#32;</BoldSpan>
                  <EmailText black>
                    {activeIds[specReq._id]
                      ? specReq.message
                      : specReq.message.slice(0, 250)}
                  </EmailText>
                  {specReq.message.length >= 250 && (
                    <ViewMore onClick={this.toggleViewMore} id={specReq._id}>
                      View {activeIds[specReq._id] ? 'more' : 'less'}
                    </ViewMore>
                  )}
                </div>
              </WhiteWrapper>
            </SubDetails>
          ))
        ) : (
          <Empty
            description="No messages received currently."
            style={{ marginTop: '5rem' }}
          />
        )}
      </div>
    );
  }
}

export default SpecialRequirements;
