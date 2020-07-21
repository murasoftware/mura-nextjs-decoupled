import React from 'react';
import { ColumnContainer, Column } from '@styles/atoms';
import { Image, FullWidthTitle } from './TwoImage.style';

const TitleAbove = ({ image1, image2, copy }) => {
  return (
    <>
      <ColumnContainer>
        <Column lcols={8} scols={12}>
          <FullWidthTitle>{copy}</FullWidthTitle>
        </Column>
      </ColumnContainer>
      <ColumnContainer>
        <Column lcols={4} scols={12}>
          <Image src={image1} />
        </Column>
        <Column lcols={8} scols={12}>
          <Image src={image2} />
        </Column>
      </ColumnContainer>
    </>
  );
};

export default TitleAbove;
