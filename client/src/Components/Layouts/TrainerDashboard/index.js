import React, { Component } from "react";
import axios from "axios";
import setAuthToken from "../../../Utils/setAuthToken";
import DashboardLinks from "./DashboardLinks";
import Statistic from "./statistics";
import DashboardHeader from "./header";
import Header from "../../CommonComponents/Header";
import { Wrapper } from "./Dashboard_StyledComponents";

// NOTE: Trainer's unique ID gets passed down as a prop from the top App state

class Dashboard extends Component {
  state = {
    trainerFirstName: "",
    loaded: false,
    sessionCount: "",
    responsesCount: "",
    surveysCount: "",
  };

  componentDidMount() {
    const { history } = this.props;
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      axios
        .get("/dashboard")
        .then((res) => {
          this.setState({
            trainerFirstName: res.data.firstName,
            loaded: true,
          });
        })
        .catch(() => history.push("/server-error"));
    }

    axios.get("/view-sessions").then((res) => {
      this.setState({ sessionCount: res.data.length });
      const surveysCount = res.data.reduce(
        (total, amount) => (amount.type === 1 ? total + 2 : total + 1),
        0,
      );
      this.setState({ surveysCount });
    });

    axios.get("/trainer/overview").then((res) => {
      const responsesCount = res.data[1].responses.reduce((total, amount) => total + amount.sum, 0);
      this.setState({ responsesCount });
    });
  }

  render() {
    const {
      loaded, trainerFirstName, sessionCount, responsesCount, surveysCount,
    } = this.state;

    if (!loaded) {
      return <h1>Loading your details...</h1>;
    }

    return (
      <Wrapper className="dashboard">
        <Header />
        <DashboardHeader trainerFirstName={trainerFirstName} />
        <Statistic
          sessionCount={sessionCount}
          responsesCount={responsesCount}
          surveysCount={surveysCount}
        />
        <DashboardLinks />
      </Wrapper>
    );
  }
}

export default Dashboard;
