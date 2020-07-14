import React from 'react';
import { ContentSource, ContentImage, ContentText, ContentTitle, ContentDesc } from './ContentSource.style';
import { Column } from '@styles/atoms';

const ContentSourceComp = ({img, title, description}) => (
    <ContentSource>
      <Column lcols={1} maxCols={4}>
        <ContentImage src={img} />
      </Column>

      <ContentText lcols={3} maxCols={4}>
        <ContentTitle>{title}</ContentTitle>
        <ContentDesc>{description}</ContentDesc>
      </ContentText>
    </ContentSource>
  )


export default ContentSourceComp;