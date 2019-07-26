// NEED TO REFACTOR TO USE THE REDUX BITS CREATED

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSVLink } from 'react-csv';
import { message } from 'antd';

import axios from 'axios';

import Button from '../Button';

import { exportDataAction } from '../../../actions/exportDataAction';

class ExportButton extends Component {
  state = {
    dataToExport: [],
    filter: false,
    trainerIDs: null,
  };

  componentDidMount() {
    const { viewLevel, selectedUser, userId } = this.props;
    console.log('role', selectedUser);
    // check if there's a selectedUserRole

    // if trainer then just filter for that trainer
    if (viewLevel === 'trainer') {
      this.setState({ filter: true, trainerIDs: [userId] });
    }

    if (viewLevel === 'localLead') {
      // if locallead but wanting to export results for specific trainer
      if (selectedUser && selectedUser.role === 'trainer') {
        this.setState({ filter: true, trainerIDs: [selectedUser._id] });
      } else {
        // get all the trainer ids for that local lead
        this.getTrainerIDs(userId);
      }
    }

    if (viewLevel === 'admin') {
      // if admin and looking at the results for a local lead
      if (selectedUser && selectedUser.role === 'localLead') {
        // get list of that localLeads trainers
        this.getTrainerIDs(selectedUser._id);
      } else if (selectedUser && selectedUser.role === 'trainer') {
        // get the results for that specific trainer
        this.setState({ filter: true, trainerIDs: [selectedUser._id] });
      }
    }
  }

  getTrainerIDs = localLeadID => {
    axios
      .post('/api/users/locallead-trainers', { localLeadID })
      .then(res => {
        let trainerIDs = [];

        if (res.data.trainerList && res.data.trainerList.length > 0) {
          trainerIDs = res.data.trainerList.map(trainer => trainer._id);
        }

        this.setState({ filter: true, trainerIDs });
      })
      .catch(err => console.log(err));
  };

  fetchExportData = () => {
    // get the view level from the component
    const { filter, trainerIDs } = this.state;

    const searchData = { filter, trainerIDs };

    this.setState({ dataToExport: [] });

    axios
      .post('/api/export-csv', { searchData })
      .then(({ data }) => {
        this.setState(
          {
            dataToExport: data,
          },
          () => {
            const link = document.getElementById('csvLink');
            link.click();
          }
        );
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || 'Something went wrong');
      });
  };

  render() {
    const { dataToExport } = this.state;
    return (
      <>
        <CSVLink
          data={dataToExport}
          asyncOnClick
          id="csvLink"
          style={{ display: 'none' }}
        />
        <Button
          label="Export CSV"
          type="primary"
          ref={this.clickBtn}
          onClick={this.fetchExportData}
          width="200px"
          margin="1rem 0 1rem 0"
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  csvData: state.exportData.data,
  userId: state.auth.id,
  viewLevel: state.viewLevel.viewLevel,
});

export default connect(
  mapStateToProps,
  { exportData: exportDataAction }
)(ExportButton);
