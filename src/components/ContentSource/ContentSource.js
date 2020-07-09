import React from 'react';
import { ContentSource, ContentImage, ContentText, ContentTitle, ContentDesc } from './ContentSource.style';

const ContentSourceComp = ({img, title, description}) => (
    <ContentSource>
      <ContentImage src={img} />
      <ContentText>
        <ContentTitle>{title}</ContentTitle>
        <ContentDesc>{description}</ContentDesc>
      </ContentText>
    </ContentSource>
  )


export default ContentSourceComp;