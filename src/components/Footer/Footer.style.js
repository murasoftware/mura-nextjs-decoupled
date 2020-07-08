import styled from 'styled-components';
import { iexText, font20, iexStandard, font30 } from '@styles/typography';
import { H3, Column, ContentContainer } from '@styles/atoms';

export const Footer = styled(ContentContainer)`
  max-width: ${props =>  props.theme.sizes.maxWidth}px;
  padding: 150px 0;
  display: flex;
  flex-direction: row;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile.max}px) {
    flex-wrap: wrap;
  }
`;

export const FooterColumn = styled(Column)`
  padding: 0 20px;

  > * {
    display: block;
    margin-bottom: 35px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile.max}px) {
   padding: 0;
  }
  
`;

export const FooterAddress = styled.address`
  ${iexText}
  ${font20}
`;

export const TagLine = styled(H3)`
`;

export const FooterPhone = styled.a`

`;

export const TagLineLink = styled.a`
  ${iexStandard}
  ${font30}
`;

export const LinkRow = styled.div`
  display: flex;
  flex-direction: row;
  > * {
    padding-right: 25px;
  }
`