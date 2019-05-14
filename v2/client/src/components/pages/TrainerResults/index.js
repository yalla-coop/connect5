import React from 'react';
import Collapse from 'antd/lib/collapse';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import {
  TrainerResultsWrapper,
  Header as StyledHeader,
  ContentWrapper,
  ButtonWrapper,
} from './TrainerResults.style';

const { Panel } = Collapse;

const panels = {
  reach: 'Reach',
  sessions: 'Sessions',
  surveys: 'Surveys',
  behavior: 'Behavioural',
  feedback: 'Trainer feedback',
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
            <Panel header={panels[panel]} key={panel}>
              <p>{panel}</p>
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
