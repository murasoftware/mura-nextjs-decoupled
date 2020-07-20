import styled, { css } from 'styled-components';
import { iexText, font20 } from '@styles/typography';

export const ArrowLinkComp = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${props => props.position === 'bottom' && css`
    bottom: 156px;
    position: absolute;
  `}
`;

export const LinkText = styled.span`
  ${iexText}
  ${font20}
  text-decoration: underline;
  display: block;
  margin-right: 20px;
  padding-bottom: 3px;
`;

