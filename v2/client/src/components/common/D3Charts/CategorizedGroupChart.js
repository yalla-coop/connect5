import React, { Component } from 'react';

import Legends from './Legends';

import SubGroupChart from './SubGroupChart';

class CategorizedGroupChart extends Component {
  render() {
    const { groups, i, legends, showRepliesCount, surveyList } = this.props;

    const filteredGroups = groups.filter(item =>
      surveyList ? surveyList.includes(item.surveyType) : true
    );

    return (
      <div style={{ margin: '0 auto' }}>
        <Legends legends={legends} i={i} />
        <div
          id={`chart-groups-${i}`}
          style={{ display: 'flex', flexWrap: 'wrap', margin: '0 auto' }}
        >
          {filteredGroups.map((group, k) => (
            <div key={group.surveyType} style={{ margin: '0 auto' }}>
              <SubGroupChart
                subGroup={group}
                i={`${i}-${k}`}
                legends={legends}
                title={group.readableName}
                dataset={group.categories}
                replies={
                  showRepliesCount ? group.filterdResonses || '0' : undefined
                }
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CategorizedGroupChart;
