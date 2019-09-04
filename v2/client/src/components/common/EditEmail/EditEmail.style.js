import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  font-family: Roboto;
  margin: 0 auto;
  max-width: 678px;
  padding: 72px 5%;

  #participantEmails {
    .ant-select-selection.ant-select-selection--single {
      height: 5rem;
    }
    .ant-select-selection__rendered {
      height: 100%;
    }
  }
`;

export const SuccessMessageDiv = styled.div`
  width: 100%;
  background: #ffffff;
  text-align: center;
  margin: 0px auto 20px;
`;

export const SubHeader = styled.h4`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 20px;
  color: #000000;
`;

export const StyledLink = styled(Link)`
  font-size: 16px;
  line-height: 19px;
  color: #2f80ed;
  margin-bottom: 20px;
  display: inline-block;
`;

export const Paragraph = styled.p`
  font-size: 16px;
  line-height: 19px;
  color: #000000;
`;

export const Label = styled.label`
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
`;

export const SelecetWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;

export const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  min-width: 90px;
  margin-bottom: 5px;
`;
