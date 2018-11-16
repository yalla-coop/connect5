import React, { Component } from "react";
import styled from "styled-components";


const Main = styled.div`
 width: 100%;
 height: 100%
`;

class ViewSessions extends Component {
  render() {
    return (
      <Main>
        <div>
          <div>
            <div>No.</div>
          </div>
        </div>

        <div>
          <div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>

      </Main>
    );
  }
}

export default ViewSessions;
