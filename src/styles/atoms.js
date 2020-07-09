import styled from 'styled-components';
import {
  font140,
  font60,
  font30,
  font20,
  iexStandard,
  iexBold,
  iexText,
} from './typography';

export const ContentContainer = styled.div`
  max-width: ${props =>  props.theme.sizes.maxWidth}px;
  @media (max-width: ${props => props.theme.sizes.maxWidth}px) {
    padding: 0 10%;
  }
  margin: 0 auto;
`;

export const H1 = styled.h1`
  ${iexStandard}
  ${font140}
`;

export const H2 = styled.h2`
  ${iexStandard}
  ${font60}
`;

export const H3 = styled.h3`
  ${iexStandard}
  ${font30}
`;

export const H4 = styled.h4`
  ${iexBold}
  ${font20}
`;

export const NavLink = styled.a`
  text-decoration: none;
  ${iexText}
  ${font20}
`;

export const NavStyle = styled.p`
  ${iexText}
  ${font20}

`;


export const Column = styled.div`
  padding: 0 20px;
  flex-basis: ${props => `calc( 100% / 12 * ${props.lcols})` || `calc(100% / 12 * 3)`};
  width: ${props => `calc( 100% / 12 * ${props.lcols})` || `calc(100% / 12 * 3)`};
  min-width: ${props => `calc( 100% / 12 * ${props.lcols})` || `calc(100% / 12 * 3)`};

  @media (max-width: ${props => props.theme.breakpoints.tablet.max}px) {
    flex-basis: ${props => `calc( 100% / 12 * ${props.mcols})` ||  `calc(100% / 12 * 3)`};
    width: ${props => `calc( 100% / 12 * ${props.mcols})` ||  `calc(100% / 12 * 3)`};

  }

  @media (max-width: ${props => props.theme.breakpoints.mobile.max}px) {
    flex-basis: ${props => `calc( 100% / 12 * ${props.scols})` ||  `calc(100% / 12 * 12)`};
    width: ${props => `calc( 100% / 12 * ${props.scols})` ||  `calc(100% / 12 * 12)`};
  }

  &:first-of-type {
    padding-left: 0;
  }

  &:last-of-type {
    padding-right: 0;
  }
`;
