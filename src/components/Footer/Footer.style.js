import styled from 'styled-components';
import { iexText, font20, iexStandard, font30 } from '@styles/typography';
import { H3, Column, ContentContainer, NavStyle, NavLink } from '@styles/atoms';

export const Footer = styled(ContentContainer)`
  max-width: ${props => props.theme.sizes.maxWidth}px;
  padding: 150px 0;
  display: flex;
  flex-direction: row;

  @media (max-width: ${props => props.theme.breakpoints.mobile.max}px) {
    flex-wrap: wrap;
  }
`;

export const FooterAddress = styled.address`
  ${iexText}
  ${font20}
`;

export const TagLine = styled(H3)``;

export const FooterPhone = styled.a``;

export const RightContainer = styled(Column)`
  display: flex;
  flex-direction: row;
  padding: 0;

  @media (max-width: ${props => props.theme.breakpoints.tablet.max}px) {
    flex-wrap: wrap;

    > div {
      padding: 0 40px 0 0;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile.max}px) {
    padding: 0;

    > div {
      padding: 35px 0 0 0;
    }
  }
`;

export const TagLineLink = styled.a`
  ${iexStandard}
  ${font30}
  white-space: nowrap;
  span {
    margin-right: 10px;
  }
`;

export const LinkRow = styled.div`
  display: flex;
  flex-direction: row;
  > * {
    padding: 0 25px 0 0;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile.max}px) {
    justify-content: space-between;
    > * {
      padding: 0;
    }
  }
`;

export const FooterColumn = styled(Column)`
  padding: 0 20px;

  ${TagLineLink}, ${NavLink}, ${NavStyle}, ${TagLine}, ${FooterAddress} {
    margin-bottom: 35px;
    display: block;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile.max}px) {
    padding-top: 35px;
    border-top: 1px solid ${props => props.theme.colors.border};
    padding-left: 0;

    ${TagLineLink}, ${TagLine} {
      margin-bottom: 45px;
    }



    &:first-of-type {
      border-top: none;
    }
  }
`;
