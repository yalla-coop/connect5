// NEED TO REFACTOR TO USE THE REDUX BITS CREATED

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSVLink } from 'react-csv';

import Button from '../Button';

import { exportDataAction } from '../../../actions/exportDataAction';

class ExportButton extends Component {
  clickBtn = React.createRef();

  fetchExportData = () => {
    // get the view level from the component
    const { exportData, filters } = this.props;

    const cb = this.clickBtn.current.link.click;
    exportData(filters, cb);
  };

  render() {
    const { csvData } = this.props;
    return (
      <>
        <CSVLink
          data={csvData}
          asyncOnClick
          id="csvLink"
          style={{ display: 'none' }}
          ref={this.clickBtn}
        />
        <Button
          label="Export CSV"
          type="primary"
          onClick={this.fetchExportData}
          width="200px"
          margin="1rem auto"
          style={{ display: 'block' }}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  csvData: state.exportData.data,
  userId: state.auth.id,
});

export default connect(
  mapStateToProps,
  { exportData: exportDataAction }
)(ExportButton);
