import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Button } from 'antd';
import Header from '../../common/Header';
import Spin from '../../common/Spin';
import PrintableComponent from './PrintableComponent';
import history from '../../../history';

// STYLING
import { Wrapper, BackContainer, BackLink } from './PrintSessionDetails.style';

export default class PrintSessionDetails extends Component {
  print = () => {
    const {
      location: {
        state: { details },
      },
    } = this.props;

    const {
      sessionDate,
      sessionRegion,
      sessionShortId,
      sessionTrainers,
      sessionType,
      address,
    } = details;

    // create new window
    const mywindow = window.open('', 'PRINT', 'height=400,width=400');
    //
    const dummyDiv = document.createElement('div');

    ReactDOM.render(
      <PrintableComponent
        sessionType={sessionType}
        sessionDate={sessionDate}
        sessionRegion={sessionRegion}
        address={address}
        sessionTrainers={sessionTrainers}
        sessionShortId={sessionShortId}
      />,
      dummyDiv
    );

    mywindow.document.write(dummyDiv.outerHTML);

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    // set font family to the new document
    const link = mywindow.document.createElement('link');
    link.setAttribute(
      'href',
      'https://fonts.googleapis.com/css?family=Roboto:300,300i,400,500,700'
    );
    link.setAttribute('rel', 'stylesheet');

    mywindow.document.head.appendChild(link);

    // print the new document
    mywindow.print();
    mywindow.addEventListener('afterprint', () => {
      mywindow.close();
    });
  };

  render() {
    const {
      location: {
        state: { details },
      },
    } = this.props;

    if (!details) {
      return <Spin />;
    }
    const {
      sessionDate,
      sessionRegion,
      sessionShortId,
      sessionTrainers,
      sessionType,
      address,
    } = details;

    return (
      <div>
        <Wrapper>
          <Header type="section" label="Connect 5 Session Details" />
          <BackContainer>
            <BackLink onClick={history.goBack}>{`< Back`}</BackLink>
          </BackContainer>
          <PrintableComponent
            sessionType={sessionType}
            sessionDate={sessionDate}
            sessionRegion={sessionRegion}
            address={address}
            sessionTrainers={sessionTrainers}
            sessionShortId={sessionShortId}
          />
          <div>
            <Button onClick={this.print}>PRINT</Button>
          </div>
        </Wrapper>
      </div>
    );
  }
}
