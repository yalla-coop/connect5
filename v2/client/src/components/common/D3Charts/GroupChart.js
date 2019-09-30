import React, { Component } from 'react';

import Legends from './Legends';

import SubGroupChart from './SubGroupChart';

class GroupChart extends Component {
  componentDidMount() {}

  render() {
    const { groups, i, legends } = this.props;
    return (
      <div>
        <Legends legends={['Capability', 'Opportunity', 'Motivation']} i={i} />
        <div
          id={`chart-groups-${i}`}
          style={{ display: 'flex', flexWrap: 'wrap' }}
        >
          {groups.map((group, k) => (
            <>
              <SubGroupChart
                subGroup={group}
                k={k}
                i={i}
                legends={legends}
                title={group.surveyType}
              />
            </>
          ))}
        </div>
      </div>
    );
  }
}

export default GroupChart;
