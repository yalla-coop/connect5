import React, { Component } from 'react';

import SubGroupChart from './SubGroupChart';

class NCategorizedGroupChart extends Component {
  componentDidMount() {}

  render() {
    const { groups, i } = this.props;
    return (
      <div>
        <div
          id={`chart-groups-${i}`}
          style={{ display: 'flex', flexWrap: 'wrap' }}
        >
          {groups.map((group, k) => (
            <div key={group.surveyType}>
              <SubGroupChart
                subGroup={group}
                k={k}
                i={`${i}-${k}`}
                legends={[group.surveyType]}
                title={group.surveyType}
                dataset={[group]}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default NCategorizedGroupChart;
