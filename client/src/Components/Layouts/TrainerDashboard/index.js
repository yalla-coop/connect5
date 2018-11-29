import React, { Component } from "react";
import axios from "axios";
import setAuthToken from "../../../Utils/setAuthToken";
import {
  Wrapper, Header, Statistics, Links, Welcome, Container, ItemCount, StatisticItems, ItemName, Span, LinkWrapper, IconDiv, Navlink, Icon, UserName,
} from "./StyledComponents";

// NOTE: Trainer's unique ID gets passed down as a prop from the top App state

class Dashboard extends Component {
  state = {
    trainerFirstName: "",
    loaded: false,
  };

  componentDidMount() {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      axios
        .get("/dashboard")
        .then((res) => {
          this.setState({
            trainerFirstName: res.data.firstName,
            loaded: true,
          });
          console.log("RES", res);
          console.log(this.props);
        })
        .catch(err => console.log(err));
    }

    axios
      .get("/dashboard-Statistics")
      .then((res) => {
      });
  }

  render() {
    const { loaded, trainerFirstName } = this.state;

    if (!loaded) {
      return (<h1>Loading your details...</h1>);
    }

    return (

      <Wrapper className="dashboard">
        <Header>
          <Welcome>
            Welcome back,
            <UserName>
              {trainerFirstName}
!
            </UserName>
          </Welcome>
        </Header>

        <Statistics>
          <Container>
            <StatisticItems>
              <ItemName>sessions</ItemName>
              <ItemCount>4</ItemCount>
            </StatisticItems>
            <StatisticItems>
              <ItemName>surveys</ItemName>
              <ItemCount>7</ItemCount>
            </StatisticItems>
            <StatisticItems>
              <ItemName>responses</ItemName>
              <ItemCount>8</ItemCount>
            </StatisticItems>
          </Container>
        </Statistics>

        <Links>

          <LinkWrapper>
            <Navlink to="/view-sessions">
              <IconDiv>
                <Icon className="fas fa-list-alt" />
              </IconDiv>
              <div>
                <Span>Sessions</Span>
              </div>
            </Navlink>
          </LinkWrapper>

          <LinkWrapper>
            <Navlink to="">
              <IconDiv>
                <Icon className="fas fa-poll-h" />
              </IconDiv>
              <div>
                <Span>Results</Span>
              </div>
            </Navlink>
          </LinkWrapper>

          <LinkWrapper>
            <Navlink to="/create-session">
              <IconDiv>
                <Icon className="fas fa-plus-circle" />
              </IconDiv>
              <div>
                <Span>New Session</Span>
              </div>
            </Navlink>
          </LinkWrapper>
        </Links>


      </Wrapper>
    );
  }
}

export default Dashboard;
