import React, { Component } from 'react';

import SubGroupChart from './SubGroupChart';
import Legends from './Legends';

class NCategorizedGroupChart extends Component {
  componentDidMount() {}

  render() {
    const { groups, i, legends } = this.props;
    return (
      <div style={{ margin: '0 auto' }}>
        <Legends legends={legends} i={i} />

        <div
          id={`chart-groups-${i}`}
          style={{ display: 'flex', flexWrap: 'wrap', margin: '0 auto' }}
        >
          {groups.map((group, k) => (
            <div key={group.surveyType} style={{ margin: '0 auto' }}>
              <SubGroupChart
                subGroup={group}
                k={k}
                i={`${i}-${k}`}
                legends={[group.surveyType]}
                title={group.readableName}
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
