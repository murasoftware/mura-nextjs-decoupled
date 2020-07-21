import styled from 'styled-components';
import { font24, font30, font60, font140, iexStandard, iexText } from '@styles/typography';
import { Column, ColumnContainer, ContentContainer } from '@styles/atoms';
import theme from '@styles/theme';

export const PodcastsContainer = styled(ContentContainer)`
  position: relative;

  @media (max-width: ${theme.breakpoints.tablet.max}px) {

  }

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    padding: 0 0 49px;
  }
`;

// Source/Section info
export const SectionInfo = styled(ColumnContainer)`
  border-top: 1px solid ${theme.colors.border};
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;

  &:first-child {
    z-index: 3;
  }

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    position: static;
  }
`;

export const SectionLogo = styled(Column)`
  display: flex;
  flex-direction: column;

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    order: 2;
  }
`;

const SourceContainerOffset = 127;
export const SourceContainer = styled(Column)`
  display: flex;
  flex-direction: column;
  margin-top: ${SourceContainerOffset}px;

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    margin: 33px 0 35px;
    padding-left: 49px;
  }
`;

// Image Backgrounds
export const Background = styled(ColumnContainer)`
  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    flex-direction: row;
    margin: 25px 0 27px;
    position: static;
  }
`;

export const BgColumnLeft = styled(Column)``;

export const BgColumnRight = styled(Column)`
  text-align: right;
`;

export const BackgroundImage = styled.img`
  display: inline-block;
  height: 100%;
  max-height: 1362px;
  width: auto;
  
  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    max-height: 352px;
  }
`;


export const AbsoluteRow = styled(ColumnContainer)`
  ${'' /* border-bottom: 1px solid ${theme.colors.border}; */}
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;

  &:first-child {
    z-index: 3;
  }

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    flex-direction: row;
    position: static;
  }
`;

// Main content
export const LeftColumn = styled(Column)`
  display: flex;
  flex-direction: column;
`;

export const SectionTitle = styled.span``;

export const SectionTitleImage = styled.img`
  margin: 89px 0 0 253px;
  text-align: right;
  width: 231px;

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    margin: 0px 0 0 49px;
    width: 146px;
  }
`;

const infoOffset = SourceContainerOffset + 148;
export const PodcastInfo = styled(Column)`
  display: flex;
  flex-direction: column;
  margin: ${infoOffset}px 0 0 27px;
  ${iexStandard}

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    margin: 0 46px 0 48px;
  }

  &:last-of-type {
    padding-right: 300px;

    @media (max-width: ${theme.breakpoints.mobile.max}px) {
      padding-right: 0;
    }
  }
`;

export const EpisodeNumber = styled.p`
  ${font60}
`;

export const EpisodeTitle = styled.h2`
  ${font140}
  margin-bottom: 24px;
`;

export const EpisodeDescription = styled.p`
  ${font30}
  margin-bottom: 10px;

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    margin-bottom: 20px;
  }
`;

export const EpisodeDate = styled.p`
  ${iexText}
  ${font24}
  margin-bottom: 238px;

  @media (max-width: ${theme.breakpoints.mobile.max}px) {
    margin-bottom: 49px;
  }
`;
