import React from 'react';

import { SourceLabel, From, ContentType } from './SourceLabel.style';


const SourceLabelComp = ({fromLabel = 'From IEX Exchage', contentType}) => (
  <SourceLabel>
    <From>{fromLabel}</From>
    {contentType && <ContentType>{contentType}</ContentType>}
  </SourceLabel>
)

export default SourceLabelComp;