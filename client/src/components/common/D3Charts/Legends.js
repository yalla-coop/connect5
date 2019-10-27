import React, { Component } from 'react';

import { colors } from './constants';

class Legends extends Component {
  render() {
    const { legends, i } = this.props;

    return (
      <div
        id={`chart-legends-${i}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {legends.map((item, _i) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginRight: '2rem',
            }}
          >
            <div
              style={{
                background: colors[_i],
                width: '15px',
                height: '15px',
                marginRight: '0.5rem',
              }}
            ></div>
            <span>{item}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default Legends;
