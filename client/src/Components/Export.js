import React, { Component } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import axios from "axios";
import ExportButton from "./Export.style.js"

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
          console.log("RES", res) 
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
        <ExportButton>
          <a className="btn" href="">Loading data...</a>
        </ExportButton>
      )
    }

    return(
      <ExportButton>
        <CSVLink className="btn" data={this.state.csvData}
        filename={"survey-export.csv"}>Download me</CSVLink>
      </ExportButton>
    )
  }
}

export default ExportData;