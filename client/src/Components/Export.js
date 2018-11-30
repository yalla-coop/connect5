import React, { Component } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import axios from "axios";

class ExportData extends Component {

  state = {
    loaded: false,
    csvData: ["no results found"], 
  }

  componentDidMount() {
    axios.get("/export-results")
      .then(res => {
        if (res.status === 204) {
          this.setState( {
            csvData: "No results were found",
            loaded: true
          })
        } else {
          console.log("RES", res.status) 
          this.setState( {
          csvData: res.data,
          loaded: true
        })
        }})
      .catch(err => console.log(err))
  }

  render() {

    if (!this.state.loaded) {
      return (
        <div>
          <p>Loading data...</p>
        </div>
      )
    }

    return(
      <div>
        <CSVLink data={this.state.csvData}
        filename={"survey-export.csv"}>Download me</CSVLink>
      </div>
    )
  }
}

export default ExportData;