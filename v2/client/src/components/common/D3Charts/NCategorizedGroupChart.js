import React, { Component } from 'react';

import Legends from './Legends';

import SubGroupChart from './SubGroupChart';

class NCategorizedGroupChart extends Component {
  componentDidMount() {}

  render() {
    const { groups, i } = this.props;
    const legends = groups.map(item => item.surveyType);
    return (
      <div>
        <div
          id={`chart-groups-${i}`}
          style={{ display: 'flex', flexWrap: 'wrap' }}
        >
          {console.log(groups)}

          {groups.map((group, k) => (
            <>
              <SubGroupChart
                subGroup={group}
                k={k}
                i={i}
                j="nc"
                legends={[group.surveyType]}
                title={group.surveyType}
                dataset={[group]}
              />
            </>
          ))}
        </div>
      </div>
    );
  }
}

export default NCategorizedGroupChart;
