import React from 'react';

import Collapse from 'antd/lib/collapse';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import Reach from '../../common/Reach';

import {
  TrainerResultsWrapper,
  Header as StyledHeader,
  ContentWrapper,
  ButtonWrapper,
} from './TrainerResults.style';

const { Panel } = Collapse;

const panels = {
  reach: { text: 'Reach', component: <Reach /> },
  behavior: { text: 'Behavioural', component: null },
  feedback: { text: 'Trainer feedback', component: null },
};

const TrainerReslts = () => {
  return (
    <TrainerResultsWrapper>
      <StyledHeader>
        <ContentWrapper>Results</ContentWrapper>
      </StyledHeader>
      <Collapse>
        <Collapse
          accordion
          expandIconPosition="right"
          expandIcon={({ isActive }) => (
            <Icon type="down" rotate={isActive ? 90 : 0} />
          )}
        >
          {Object.keys(panels).map(panel => (
            <Panel header={panels[panel].text} key={panel}>
              {panels[panel].component}
            </Panel>
          ))}
        </Collapse>
      </Collapse>
      <ButtonWrapper>
        <Button icon="download" size="large">
          Export to CSV
        </Button>
      </ButtonWrapper>
    </TrainerResultsWrapper>
  );
};

export default TrainerReslts;
