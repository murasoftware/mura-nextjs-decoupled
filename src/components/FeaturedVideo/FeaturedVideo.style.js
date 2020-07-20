import styled from 'styled-components';
import { ContentContainer, Column, ColumnContainer } from '@styles/atoms';
import { font30, iexStandard, font20 } from '@styles/typography';
import theme from '@styles/theme';

export const FeaturedVideo = styled(ContentContainer)`
  margin-top: 100px;
  margin-bottom: 100px;

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    margin-top: 30px;
    margin-bottom: 30px;
  }


`;

export const FeaturedVideoHeader = styled(ColumnContainer)``;

export const LogoContainer = styled(Column)`
  display: flex;
  align-items: flex-end;

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    margin-bottom: 50px;
  }

`;

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 60px 0 70px 0;

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    margin: 10px 0 120px 0;
  }

`;


export const SourceContainer = styled(Column)`
  align-items: flex-end;
  display: flex;

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    margin-bottom: 30px;
  }
`;
export const TitleContainer = styled(Column)`
  ${font30}
  ${iexStandard}
  align-items: flex-end;
  display: flex;
  justify-content: flex-end;

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    justify-content: space-between;
    ${font20}
  }
`;
export const Title = styled.h3`
 
`;
export const TimeStamp = styled.span`
  margin-left: 20px;
`;
export const Logo = styled.img`
  max-width: 230px;

  @media (max-width: ${theme.breakpoints.tablet.max}px) {
    max-width: 180px;
  }

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    max-width: 50%;
  }
`;
