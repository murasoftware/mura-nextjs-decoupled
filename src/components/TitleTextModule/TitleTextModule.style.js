import styled from 'styled-components';
import { ColumnContainer, H2 } from '@styles/atoms';
import { font140, iexStandard, font24, iexText } from '@styles/typography';
import theme from '@styles/theme';

export const TitleContainer = styled(ColumnContainer)`
  margin-top: 150px;
  margin-bottom: 150px;
  
  @media (max-width: ${theme.breakpoints.tablet.max}px) {
    margin-top: 75px;
    margin-bottom: 75px;
  }

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    margin-top: 35px;
    margin-bottom: 35px;
  }

`;

export const Title = styled.h2`
  ${font140}
  ${iexStandard}

`;

export const Copy = styled.p`
  ${font24}
  ${iexText}
  margin-top: 25px;
  white-space: pre-wrap;

  @media (max-width: ${theme.breakpoints.tablet.max}px) {
    margin-top: 15px;
  }

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    margin-top: 0;
  }
`;

export const TitleStyle = styled.h1`
  margin-bottom: 150px;


  > div {
    padding-left: calc( 100% / 12 * 4 + 20px);
  }

  @media (max-width: ${theme.breakpoints.tablet.max}px) {
    margin-bottom: 75px;
  }

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    margin-bottom: 25px;

    > div {
      padding-left: 0;

    }
  }
`;