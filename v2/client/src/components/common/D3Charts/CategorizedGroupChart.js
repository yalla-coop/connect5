import React, { Component } from 'react';

import Legends from './Legends';

import SubGroupChart from './SubGroupChart';

class CategorizedGroupChart extends Component {
  componentDidMount() {}

  render() {
    const { groups, i, legends } = this.props;
    return (
      <div>
        <Legends legends={legends} i={i} />
        <div
          id={`chart-groups-${i}`}
          style={{ display: 'flex', flexWrap: 'wrap' }}
        >
          {groups.map((group, k) => (
            <>
              <SubGroupChart
                subGroup={group}
                i={`${i}-${k}`}
                legends={legends}
                title={group.surveyType}
                dataset={group.categories}
              />
            </>
          ))}
        </div>
      </div>
    );
  }
}

export default CategorizedGroupChart;
