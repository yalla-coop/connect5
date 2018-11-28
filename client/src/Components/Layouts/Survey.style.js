import styled from "styled-components";

const SurveyQs = styled.div`
  main {
    padding: 0 8px;
  }
`;

const Image = styled.img`
  height: 50px;
`;

const SurveyHeader = styled.header`
  height: 56px;
  display: flex;
  padding: 0 8px;
  background: var(--heading-color);
  align-items: center;
  justify-content: space-between;
  color: white;

  h1 {
    font-size: 1.5rem;
    font-weight: 300;
  }
`;

const SessionDetails = styled.div`
  span {
    font-weight: 600;
  }

  margin: 32px 0;
`;

const Intro = styled.div``;

const Disclaimer = styled.div`
p { font-weight: 300;}`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;

  button {
    border: 2px solid var(--heading-color);
    color: var(--heading-color);
    padding: 8px;
    border-radius: 1rem;
    background: white;
    margin-top: 24px;
    width: 50%;
    align-self: center;
    cursor: pointer;

    :hover {
      color: white;
      background: var(--heading-color);
    }
  }
`;

export {
  SurveyQs, Image, SurveyHeader, SessionDetails, Form, Intro, Disclaimer,
};
