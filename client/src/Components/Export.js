import React, { Component } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import ExportButton from "./Export.style.js";
import setAuthToken from "../Utils/setAuthToken";

class ExportData extends Component {
  state = {
    loaded: false,
    csvData: [],
  };

  componentDidMount() {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      axios
        .get("/export-results")
        .then((res) => {
          console.log("resss", res);
          if (res.status === 204) {
            this.setState({
              csvData: "No results were found",
              loaded: true,
            });
          } else {
            this.setState({
              csvData: res.data,
              loaded: true,
            });
          }
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    if (!this.state.loaded) {
      return (
        <ExportButton>
          <a className="btn" href="">
            Loading data...
          </a>
        </ExportButton>
      );
    }

    return (
      <ExportButton>
        <CSVLink className="btn" data={this.state.csvData} filename="survey-export.csv">
          Download All Survey Results
        </CSVLink>
      </ExportButton>
    );
  }
}

export default ExportData;
