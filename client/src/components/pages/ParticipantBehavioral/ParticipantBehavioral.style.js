import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors } from '../../../theme';

export const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding-top: 50px;
`;

export const Paragraph = styled.p`
  font-family: Roboto;
  font-style: italic;
  font-size: 30px;
  line-height: 37px;
  text-align: center;
  margin-bottom: 30px;
  color: #828282;
`;

export const InfoHeader = styled(Link)`
  font-weight: 300;
  color: ${colors.primary};
  text-decoration: italic;
  margin: 0;
  padding: 0;
  font-style: text-wrap

  :hover {
    color: ${colors.primary};
  }
`;

export const HeaderText = styled.header`
  font-weight: 300;
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
`;

export const StyledIframe = styled.div`
  position: relative;
  height: 0;
  padding-bottom: 56.25%;
  padding-top: 25px;
  margin-bottom: 1rem;
  max-width: 600px;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
