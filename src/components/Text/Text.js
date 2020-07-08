import React from 'react';
import Mura from 'mura.js';
import ReactMarkdown from "react-markdown";

function Text(props) {
  const objectparams = Object.assign({}, props);

  if (typeof objectparams.dynamicProps === 'undefined') {
    objectparams.dynamicProps = (async () => getDynamicProps(objectparams))();
  }

  if (typeof objectparams.dynamicProps.source !== 'undefined') {
    return (
      <ReactMarkdown source={objectparams.dynamicProps.source} />
    );
  } 
    return (
      <ReactMarkdown source={objectparams.source} />
    );
  
}

export const getDynamicProps = async props => {
  const data = {};
  if (
    typeof props.sourcetype !== 'undefined' &&
    props.sourcetype === 'component' &&
    Mura.isUUID(props.source)
  ) {
    data.source = await Mura.getEntity('content')
      .loadBy('contentid', props.source, { type: 'component', fields: 'body' })
      .get('body');
  }

  return data;
};

export default Text;
