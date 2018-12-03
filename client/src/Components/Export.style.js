import styled from "styled-components";

const ExportButton = styled.div`
  padding-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  .btn {
    border: 1px solid var(--button-background-color);
    color: var(--button-background-color);
    padding: 8px;
    border-radius: 8px;
    text-decoration: none;

    :hover {
      background: var(--heading-color);
      color: white;
    }
  }
`;

export default ExportButton;
