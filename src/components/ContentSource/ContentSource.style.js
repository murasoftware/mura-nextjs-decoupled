import styled from 'styled-components';
import { iexBold, font16, iexText } from '@styles/typography';

export const ContentSource = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const ContentImage = styled.img`
  width: 33.33%;
`;

export const ContentText = styled.div`
  width: 66.66%;
`;

export const ContentTitle = styled.p`
  ${iexBold}
  ${font16}
`;

export const ContentDesc = styled.p`
  ${iexText}
  ${font16}
`;
