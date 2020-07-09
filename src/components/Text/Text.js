import React from 'react';
import Mura from 'mura.js';
import ReactMarkdown from "react-markdown";

function Text(props) {
  const objectparams = Object.assign({}, props);
  let initialSource='';

  if (Mura.isUUID(objectparams.source)){
    if( typeof objectparams.dynamicProps === 'undefined') {
      getDynamicProps(objectparams).then((dynamicProps)=>{
        setSource(dynamicProps.source);
      });
    } else {
      initialSource=objectparams.dynamicProps.source;
    }
  } else {
    initialSource=objectparams.source;
  }

  const [source, setSource] = React.useState(initialSource);

  return (
    <ReactMarkdown source={source} />
  );
  
  
}

export const getDynamicProps = async props => {
  const data = {};
  if (
    typeof props.sourcetype !== 'undefined' &&
    props.sourcetype === 'component' &&
    Mura.isUUID(props.source)
  ) {
     const entity= await Mura.getEntity('content')
      .loadBy('contentid', props.source, { type: 'component', fields: 'body' });
    data.source=entity.get('body');
  }

  return data;
};

export default Text;
