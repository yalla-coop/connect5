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

    const ref = this.clickBtn.current.link;
    exportData(filters, ref);
  };

  render() {
    const { csvData, text, width } = this.props;
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
          label={text || 'Export CSV'}
          type="primary"
          onClick={this.fetchExportData}
          width={width || '200px'}
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
