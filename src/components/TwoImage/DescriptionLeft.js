import React from 'react';
import { ColumnContainer, Column } from '@styles/atoms';
import { Image, Description } from './TwoImage.style';

const DescriptionLeft = ({ image1, image2, copy }) => {
  return (
    <ColumnContainer>
      <Column lcols={4} scols={12}>
        <Description>{copy}</Description>
      </Column>
      <Column lcols={4} scols={12}>
        <Image src={image1} />
      </Column>

      <Column lcols={4} scols={12}>
        <Image src={image2} />
      </Column>
    </ColumnContainer>
  );
};

export default DescriptionLeft;
