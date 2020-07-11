import React,{useState,useEffect} from 'react';
import Mura from 'mura.js';
import ReactMarkdown from "react-markdown";

function Text(props) {
  const objectparams = Object.assign({}, props);
  const [source, setSource]=useState('');

  useEffect(() => {
    if (Mura.isUUID(objectparams.source)){
      if( typeof objectparams.dynamicProps === 'undefined') {
        getDynamicProps(objectparams).then((dynamicProps)=>{
          setSource(dynamicProps.source);
        });
      } else {
        setSource(objectparams.dynamicProps.source);
      }
    } else {
      setSource(objectparams.source);
    }
  },[]);

  if(source){
    return (
      <ReactMarkdown source={source} />
    );
  } else {
    return (
      <div></div>
     );
  }

  
  
  
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
