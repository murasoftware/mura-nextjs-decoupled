import React from 'react';
import Mura from 'mura.js';

function Text(props) {
  const objectparams = Object.assign({}, props);

  if (typeof objectparams.dynamicProps === 'undefined') {
    objectparams.dynamicProps = (async () =>
      getDynamicProps(objectparams))();
  }

  if (typeof objectparams.dynamicProps.source !== 'undefined') {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: objectparams.dynamicProps.source }}
      />
    );
  }
  return <div dangerouslySetInnerHTML={{ __html: objectparams.source }} />;
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
