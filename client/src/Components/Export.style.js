import styled from "styled-components";

const ExportButton = styled.div`
  padding-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-bottom: 30px;
  .btn {
    border: 1px solid var(--button-background-color);
    color: var(--button-background-color);
    padding: 8px;
    border-radius: 8px;
    text-decoration: none;

    :hover {
      background: var(--light-div);
      color: white;
    }
  }
`;

export default ExportButton;
