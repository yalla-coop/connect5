import React, { Component } from 'react';

import Legends from './Legends';

import SubGroupChart from './SubGroupChart';

class CategorizedGroupChart extends Component {
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
                i={`${i}-${k}`}
                legends={legends}
                title={group.surveyType}
                dataset={group.categories}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CategorizedGroupChart;
