import React from 'react';

import { SourceLabel, From, ContentType } from './SourceLabel.style';


const SourceLabelComp = ({fromLabel = 'From IEX Exchage', contentType = 'Latest Articles'}) => (
  <SourceLabel>
    <From>{fromLabel}</From>
    <ContentType>{contentType}</ContentType>
  </SourceLabel>
)

export default SourceLabelComp;