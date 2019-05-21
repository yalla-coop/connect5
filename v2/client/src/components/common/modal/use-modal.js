import React, { Component } from 'react';
import Modal from './index';

// this component just an explaniation of how to use modal, will remove it later

class UseModal extends Component {
  state = {
    isOpen: false,
  };

  render() {
    const { isOpen } = this.state;
    return (
      // use modal and pass isOpen and and onClose as props
      <div>
        <button type="button" onClick={e => this.setState({ isOpen: true })}>
          Open modal
        </button>
        <Modal isOpen={isOpen} onClose={e => this.setState({ isOpen: false })}>
          I AM A CHILDREN OF MODAL, REPLACE ME AS YOU LIKE :)
        </Modal>
      </div>
    );
  }
}

export default UseModal;
