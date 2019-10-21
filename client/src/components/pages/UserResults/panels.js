import React from 'react';

import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';
import Reach from '../../common/Reach';
import Feedback from '../../common/Feedback';

import { HeaderDiv } from './UserResults.style';
import BehavioralInsight from '../../common/BehavioralInsight';

const showModal = content => {
  Modal.info({
    content,
    style: { top: 20 },
    icon: false,
  });
};

const content = {
  cont1:
    'This section provides an overview of sessions and related surveys collected via the app. I you wish to export the results click on "Export as CSV" and it will export and do',
  cont2:
    'This section shows a break down of answers given by your course participants stemming from surveys responses (categories: about your way of teaching (train the trainer) and about your trainer(other session types). The numbers show the count of each answerrelated to a particular survey type).',
  cont3:
    'We all know that changing what we do is not as simple as knowing what to do. Just because we CAN do something doesn’t mean that we WILL do it. We will be asking you some questions about what you do in practice, about what you expect you will do when you return to work and about some of the thoughts and feelings you have that make up your capability, opportunity and motivation. This will help you and us understand about experiences of doing the behaviours promoted in Connect 5 as you go about your work.',
};

export default {
  reach: {
    text: (
      <HeaderDiv>
        Reach
        <Icon
          onClick={e => {
            e.stopPropagation();
            showModal(content.cont1);
          }}
          type="info-circle"
          style={{ marginLeft: '1rem', color: '#1890ff' }}
        />
      </HeaderDiv>
    ),
    render: ({
      results,
      role,
      handleFilteredData,
      defaultFilters,
      hiddenFields,
    }) => (
      <Reach
        data={results}
        role={role}
        handleFilteredData={handleFilteredData}
        defaultFilters={defaultFilters}
        hiddenFields={hiddenFields}
      />
    ),
  },
  feedback: {
    text: (
      <HeaderDiv>
        Trainer feedback
        <Icon
          onClick={e => {
            e.stopPropagation();
            showModal(content.cont2);
          }}
          type="info-circle"
          style={{ marginLeft: '1rem', color: '#1890ff' }}
        />
      </HeaderDiv>
    ),
    render: ({ resultForRole, filters, hiddenFields }) => (
      <Feedback
        role={resultForRole}
        showFilters
        defaultFilters={filters}
        hiddenFields={hiddenFields}
      />
    ),
  },
  trainTrainerFeedback: {
    text: (
      <HeaderDiv>
        Train the Trainer Feedback
        <Icon
          onClick={e => {
            e.stopPropagation();
            showModal(content.cont2);
          }}
          type="info-circle"
          style={{ marginLeft: '1rem', color: '#1890ff' }}
        />
      </HeaderDiv>
    ),
    render: ({ resultForRole, filters, hiddenFields }) => (
      <Feedback
        role={resultForRole}
        showFilters
        defaultFilters={filters}
        hiddenFields={hiddenFields}
        isTrainTrainersFeedback
      />
    ),
  },
  behavior: {
    text: (
      <HeaderDiv>
        Behavioural
        <Icon
          onClick={e => {
            e.stopPropagation();
            showModal(content.cont3);
          }}
          type="info-circle"
          style={{ marginLeft: '1rem', color: '#1890ff' }}
        />
      </HeaderDiv>
    ),
    render: ({
      resultsFor,
      resultForRole,
      filters,
      hiddenFields,
      ...props
    }) => {
      return (
        <BehavioralInsight
          {...props}
          trainerId={resultsFor}
          role={resultForRole}
          defaultFilters={filters}
          hiddenFields={hiddenFields}
          showFilters
        />
      );
    },
  },
};
