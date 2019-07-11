import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSVLink } from 'react-csv';
import { message } from 'antd';

import axios from 'axios';

import Button from '../Button';

import { exportDataAction } from '../../../actions/exportDataAction';

class ExportButton extends Component {
  state = { dataToExport: [], downloaded: false };

  fetchData = async () => {
    const { exportData } = this.props;
    this.setState({ downloaded: false });
    await exportData(false);
  };

  render() {
    const { csvData, exportData } = this.props;
    const { downloaded, dataToExport } = this.state;
    console.log('hello');
    return (
      <>
        <CSVLink
          data={dataToExport}
          asyncOnClick
          onClick={(event, done) => {
            axios
              .post('/api/export-csv', { filter: false })
              .then(({ data }) => {
                this.setState(
                  {
                    dataToExport: data,
                  },
                  () => done()
                );
              })
              .catch(err => {
                const error =
                  err.response && err.response.data && err.response.data.error;
                message.error(error || 'Something went wrong');
              });
          }}
        >
          <Button label="Export CSV" type="outline" />
        </CSVLink>
      </>
    );
  }
}

const mapStateToProps = state => ({
  csvData: state.exportData.data,
});

export default connect(
  mapStateToProps,
  { exportData: exportDataAction }
)(ExportButton);
