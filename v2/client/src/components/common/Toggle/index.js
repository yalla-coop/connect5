import React from 'react';
import styled from 'styled-components';

import { colors, borders } from '../../../theme';

const ToggleWrapper = styled.div`
  height: ${props => (props.large ? '50px' : '32px')};
  margin: 0 8px;
  border: 1px black solid;
  display: flex;
  width: ${props => props.width || '300px'};
  cursor: pointer;
  border-radius: 4px;
  border: ${borders.toggle};
  font-size: 14px;
  text-transform: capitalize;
`;

const LeftHalf = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.selected === 'left' && `${colors.black}`};
  color: ${props => props.selected === 'left' && `${colors.offWhite}`};
  text-align: center;
`;

const RightHalf = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.selected === 'right' && `${colors.black}`};
  color: ${props => props.selected === 'right' && `${colors.offWhite}`};
  text-align: center;
`;

// NOTE: To make sure it toggles give a prop called selected
// and change to either 'right' or 'left' depending on what's the opposite
// to what's currently been highlight on the last click

const Toggle = ({ leftText, rightText, style, onClick, ...props }) => {
  return (
    <ToggleWrapper {...props} style={style}>
      <LeftHalf onClick={() => onClick('left')} {...props}>
        {leftText}
      </LeftHalf>
      <RightHalf onClick={() => onClick('right')} {...props}>
        {rightText}
      </RightHalf>
    </ToggleWrapper>
  );
};

export default Toggle;
