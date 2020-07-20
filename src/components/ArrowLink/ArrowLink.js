import React from 'react';
import { RightArrow } from '@components/Icons/Icons';
import {ArrowLinkComp, LinkText } from './ArrowLink.style';

const ArrowLink = ({text, link, position}) => (
  <ArrowLinkComp href={link} position={position}>
    <LinkText>
      {text}
    </LinkText>
    <RightArrow />
  </ArrowLinkComp>
);


export default ArrowLink;