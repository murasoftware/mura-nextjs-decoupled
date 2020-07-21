import React, {useState, useEffect} from 'react';
import { ColumnContainer, Column } from '@styles/atoms';
import { Image, Title } from './TwoImage.style';

const TitleLeft = ({
  image1, image2, copy
}) => {

  return (
    <ColumnContainer>
      <Column lcols={4} scols={12}>
        <Title className="mobile">{copy}</Title>
        <Image src={image1} />
        <Title>{copy}</Title>
      </Column>
      <Column lcols={8} scols={12}>
        <Image src={image2} />
      </Column>
    
    </ColumnContainer>
  )

}

export default TitleLeft;