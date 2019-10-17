import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Modal, Collapse } from 'antd';
import ParticipantBehavioralInsight from '../../common/BehavioralInsight';
import {
  Wrapper,
  InfoHeader,
  StyledIframe,
  HeaderText,
} from './ParticipantBehavioral.style';
import Header from '../../common/Header';

const { Panel } = Collapse;

const ParticipantBehavioral = ({ isAuthenticated, PIN, role }) => {
  const [modalVisible, setModalVisible] = useState(false);
  // toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  if (!isAuthenticated || role !== 'participant' || !PIN) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Header type="home" userRole="participent" />
      <Wrapper>
        <HeaderText>
          <p>
            The aim of Connect5 is to improve population mental wellbeing by
            changing the way people have conversations about mental wellbeing
            with the public.
          </p>
          <InfoHeader to="#" onClick={toggleModal}>
            Click here to learn more
          </InfoHeader>
        </HeaderText>
        <ParticipantBehavioralInsight
          userRole={role}
          idOrPIN={PIN}
          filters={{ PIN }}
        />
        <Modal
          title="Connect5 Impacting Behaviour"
          visible={modalVisible}
          onOk={toggleModal}
          onCancel={toggleModal}
          width={800}
        >
          <p>
            The aim of Connect5 is to improve population mental wellbeing by
            changing the way people have conversations about mental wellbeing
            with the public.
          </p>
          <p>
            By answering questions in our surveys we can understand how well we
            are helping you with these sorts of conversations, and use this to
            improve the quality of our training
          </p>
          <StyledIframe>
            <iframe
              src="https://www.youtube.com/embed/ZuxBz8RvqY8"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="introductionVideo"
            ></iframe>
          </StyledIframe>
          <Collapse bordered={false}>
            <Panel header="What are mental wellbeing conversations?" key="1">
              <p>
                {'"'}Mental wellbeing conversations{'"'} includes a lot of
                different types of conversation. Connect5 is targeting three
                types of conversation. These are:
              </p>
              <ol>
                <li>
                  Conversations in which you suggest ways a person can take
                  action to improve mental wellbeing.
                </li>
                <li>
                  Conversations in which you and the person you are talking to
                  develop a shared understanding of that person’s mental
                  wellbeing needs.
                </li>
                <li>
                  Conversations that empower a person to make changes that
                  address their mental wellbeing needs.
                </li>
              </ol>
              <p>
                These three types of conversation increase in both complexity
                and probably time take from the first to the last.
              </p>
            </Panel>
            <Panel
              header="Find out more about what we mean when we say 'conversations in which you suggest ways a person can take action to improve mental wellbeing.'"
              key="2"
            >
              <p>
                Here we include brief wellbeing advice. This could include
                things like “have you thought of looking at any self-help
                materials?” or “that sounds difficult for you, what are your
                thoughts about what you might need to support you though it”.
              </p>
              <p>
                This behaviour assumes that you might not have opportunity in
                terms of your role or time to go a step further and, together
                with the person, develop a shared understanding of their mental
                health and wellbeing needs. These conversations will probably be
                quite short.
              </p>
            </Panel>
            <Panel
              header="Find out more about what we mean when we say 'conversations in which you and the person you
are talking to develop a shared understanding of that person’s mental wellbeing needs.'"
              key="3"
            >
              <p>
                Here we mean offering brief mental wellbeing interventions. This
                goes beyond giving brief wellbeing advice. These are
                conversations in which you, and the person you are talking with,
                gain insight and discuss taking action to improve their mental
                wellbeing.
              </p>
              <p>
                It doesn’t go as far as using conversational methods to empower
                change. These conversations provide a framework for a person to
                understand why they feel like do and what action they can take
                for themselves to feel better.
              </p>
              <p>
                Examples of this type of conversation include {'"'}what’s going
                on for you at the moment?{'"'}, “when this is happening what
                kinds of things run through your mind?{'"'}, {'"'}how do you
                feel about the situation?{'"'}, {'"'}since this has been
                happening what kind of changes have you noticed in what you do?
                {'"'}
              </p>
            </Panel>
            <Panel
              header="Find out more about what we mean when we say, 'conversations in which you use appropriate
methods to empower a person to make changes that address their mental wellbeing.'"
              key="4"
            >
              <p>
                Here we are working with someone to help them gain insight into
                actions that might help them to address their mental wellbeing.
                It goes beyond developing a shared understanding of the issues,
                to the individual themselves deciding what they are going to do
                and planning their actions.
              </p>
              <p>
                You would usually need more time to have this sort of
                conversation as the action needs to be planed and reviewed. C5
                offers a range of psychologically informed tools and resources
                which target change at different aspects of a person’s
                experience and provide a framework for these conversations
              </p>
              <p>
                Examples of this type of conversation are {'"'}now we have
                identified the problem you want to address let’s figure out what
                your goal is{'"'}, {'"'}now you have identified you want to
                change your behaviour, let’s work together to make a plan so
                that you get more connection, pleasure and achievement over the
                next week{'"'}
              </p>
            </Panel>
          </Collapse>
        </Modal>
        ;
      </Wrapper>
    </>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loaded: state.auth.loaded,
  PIN: state.auth.PIN,
  role: state.auth.role,
});

export default connect(mapStateToProps)(ParticipantBehavioral);
