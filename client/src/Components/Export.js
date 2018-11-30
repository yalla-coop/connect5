import React, { Component } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import axios from "axios";

class ExportData extends Component {

  state = {
    loaded: false,
    csvData: null, 
  }

  componentDidMount() {
    axios.get("/export-results")
      .then(res => {
        console.log("RES", res.data) 
        this.setState( {
        csvData: res.data,
        loaded: true
      })})
  }

  render() {

    if (!this.state.loaded) {
      return (
        <div>
          <p>Loading data...</p>
        </div>
      )
    }

    // const csvData = [
    //   { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
    //   { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
    //   { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
    // ];

    return(
      <div>
        <CSVLink data={this.state.csvData}
        filename={"survey-export.csv"}>Download me</CSVLink>
      </div>
    )
  }
}

export default ExportData;