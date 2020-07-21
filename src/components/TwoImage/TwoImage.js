import React from 'react';
import DescriptionLeft from './DescriptionLeft';
import TitleLeft from './TitleLeft';
import TitleAbove from './TitleAbove';
import { TwoImageLayout } from './TwoImage.style';


const TwoImage = (props) => {
  const { layout, topspacing, bottomspacing } = props;
  let out = null;
  switch (layout) {
    case 'Title Above':
      out = <TitleAbove {...props} />
      break;
    case 'Description Left':
      out = <DescriptionLeft {...props} />
      break;
    case 'Title Left':
      out = <TitleLeft {...props} />
      break;

    default:
      break;
  }

  return (
    <TwoImageLayout topspacing={topspacing} bottomspacing={bottomspacing}>
      {out}
    </TwoImageLayout>
  );
};

export default TwoImage;
