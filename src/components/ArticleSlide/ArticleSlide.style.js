import styled from 'styled-components';
import { iexStandard, font140, iexText, font24 } from '@styles/typography';

export const ArticleSlide = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ArticleTitle = styled.h3`
  ${iexStandard}
  ${font140}
`;

export const ArticleDescription = styled.p`
  ${iexText}
  ${font24}
`;