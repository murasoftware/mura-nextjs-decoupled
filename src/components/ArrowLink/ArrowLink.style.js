import styled from 'styled-components';
import { iexText, font20 } from '@styles/typography';

export const ArrowLinkComp = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;

`;

export const LinkText = styled.span`
  ${iexText}
  ${font20}
  text-decoration: underline;
  display: block;
  margin-right: 20px;
  padding-bottom: 3px;
`;

