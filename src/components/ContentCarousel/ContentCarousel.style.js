import styled from 'styled-components';
import { font30, iexStandard } from '@styles/typography';
import {  Column, ContentContainer } from '@styles/atoms';


export const ContentCarousel = styled(ContentContainer)`
  display: flex;
  flex-direction: row;

`;

export const LeftColumn = styled(Column)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const RightColumn = styled.div``;

export const FadingItems = styled.div`
  position: relative;
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

`;

export const FadingItem = styled.div`
  opacity: ${props => props.isActive ? 1 : 0};
  position: absolute;
  top: 0;
  left: 0%;
  width: 100%;


`;

export const ArrowButton = styled.button`
  g {
    stroke: white;
  }

`;

export const Count = styled.span`
  ${iexStandard}
  ${font30}
  display: block;
  margin: 0 20px;
`;