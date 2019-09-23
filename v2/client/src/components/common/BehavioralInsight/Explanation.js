import React, { Component } from 'react';

import { Modal } from 'antd';

import {
  Wrapper,
  Title,
  ContentWrapper,
  ListItem,
  ReadMore,
} from './BehavioralInsight.style';

class Explanation extends Component {
  showModal = key => {
    let content = '';
    switch (key) {
      case 'capability':
        content =
          'Capability is both physical and psychological which are skills and knowledge respectively. “I know it” and “I know how to do it” and even “I can show how to do it”.';
        break;

      case 'opportunity':
        content =
          'Opportunity is both physical and social. Physical opportunity covers things like time and equipment and colleagues to do tasks with or for you. Social opportunity is best summarised as ‘the way we do things round here’ and is sometimes known as ‘culture’, ‘peer pressure’ or ‘hidden curriculum’. “I have everything I need to do it” and “people whose opinion I care about think I should do it”.';
        break;

      case 'motivation':
        content =
          'Motivation is both reflective and automatic. Reflective is when people weigh up the pros and cons of the behaviour and will include things like whether they think the behaviour will lead to a good end point, whether the behaviour is difficult or easy, whether they feel in control of doing the behaviour. Automatic is prompts, cues, impulses to carry out the behaviour and includes things like environmental prompts or cues and habit and conditioning. “On balance I think it is a good idea” and “It is part of my usual practice” and “I just do it without really thinking too much about it”.';
        break;

      default:
        break;
    }

    Modal.info({
      content: <div>{content}</div>,
      icon: false,
    });
  };

  render() {
    return (
      <Wrapper>
        <ContentWrapper>
          <Title>
            There are a range of factors that will influence whether someone
            does a new practice when they return to work after training.
          </Title>
          <Title mb0>We can usefully summarise these as:</Title>
          <ListItem>
            Capability -
            <ReadMore onClick={() => this.showModal('capability')}>
              read more
            </ReadMore>
          </ListItem>
          <ListItem>
            Opportunity -
            <ReadMore onClick={() => this.showModal('opportunity')}>
              read more
            </ReadMore>
          </ListItem>
          <ListItem>
            Motivation -
            <ReadMore onClick={() => this.showModal('motivation')}>
              read more
            </ReadMore>
          </ListItem>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

export default Explanation;
