import React, { Component } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import ExportButton from "./Export.style";
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
        .catch((err) => {
          // {todo} handle error
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  }

  render() {
    const { loaded, csvData } = this.state;
    if (!loaded) {
      return null;
    }

    return (
      <ExportButton>
        <CSVLink className="btn" data={csvData} filename="survey-export.csv">
          Download All Survey Results
        </CSVLink>
      </ExportButton>
    );
  }
}

export default ExportData;
