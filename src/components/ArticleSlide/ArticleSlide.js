import React from 'react';
import {
  ArticleSlide,
  ArticleTitle,
  ArticleDescription,
} from './ArticleSlide.style';
import { Column } from '@styles/atoms';

const ArticleSlideComp = ({ title, description }) => (
  <ArticleSlide>
    <Column lcols={4} maxCols={7}>
      <ArticleTitle>{title}</ArticleTitle>
    </Column>
    <Column lcols={3} maxCols={7}>
      <ArticleDescription>{description}</ArticleDescription>
    </Column>
  </ArticleSlide>
);

export default ArticleSlideComp;
