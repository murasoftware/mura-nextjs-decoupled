import React from 'react';
import { ContentContainer, ColumnContainer, Column } from '@styles/atoms';
import SourceLabel from '@components/SourceLabel';
import { TitleContainer, Title, Copy, TitleStyle } from './TitleTextModule.style';

const TitleTextModule = ({
  leftcolumn,
  rightcolumn,
  headline,
  pagetitle
}) => {


  return (
    <ContentContainer>
      <TitleStyle>
        <SourceLabel fromLabel={pagetitle} />
      </TitleStyle>
      <TitleContainer>
        <Column lcols={4} scols={12}>
          <Title>{headline}</Title>
        </Column>
        <Column lcols={3} mcols={4} scols={12}>
          <Copy>{leftcolumn}</Copy>
        </Column>
        <Column lcols={3} mcols={4} scols={12}>
          <Copy>{rightcolumn}</Copy>
        </Column>
      </TitleContainer>
    </ContentContainer>
  )
}

export default TitleTextModule;