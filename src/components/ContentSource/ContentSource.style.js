import styled from 'styled-components';
import { iexBold, font16, iexText } from '@styles/typography';
import { Column } from '@styles/atoms';

export const ContentSource = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const ContentImage = styled.img`
`;

export const ContentText = styled(Column)`
`;

export const ContentTitle = styled.p`
  ${iexBold}
  ${font16}
`;

export const ContentDesc = styled.p`
  ${iexText}
  ${font16}
`;
