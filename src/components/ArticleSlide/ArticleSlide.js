import React from 'react';
import {ArticleSlide, ArticleTitle,  ArticleDescription} from './ArticleSlide.style';


const ArticleSlideComp = ({title, description}) => (
  <ArticleSlide>
    <ArticleTitle>
      {title}
    </ArticleTitle>
    <ArticleDescription>
      {description}
    </ArticleDescription>
  </ArticleSlide>
)

export default ArticleSlideComp;