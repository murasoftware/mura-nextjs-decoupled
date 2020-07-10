import React,{useState} from 'react';
import Mura from 'mura.js';
import ReactMarkdown from "react-markdown";
import Link from "next/link";

function Collection(props) {
  const objectparams = Object.assign({}, props);
  let initialRawCollection='';

  if( typeof objectparams.dynamicProps === 'undefined') {
    getDynamicProps(objectparams).then((dynamicProps)=>{
      setSource(dynamicProps.rawCollection);
    });
  } else {
    initialRawCollection=objectparams.dynamicProps.rawCollection;
  }

  const [rawCollection, setRawCollection]=useState(initialRawCollection);
  
  if(rawCollection) {
    const collection = new Mura.EntityCollection(rawCollection,Mura._requestcontext);
    return (
      <CollectionLayout collection={collection} props={props} />
    )
  }
  else {
    return (
     <div></div>
    )
  }
}

export const CollectionLayout = ({props,collection}) => {
  
  return (
    <div>
      <ul>
        {collection.get('items').map(function(item, i){
          return <li key={item.get('contentid').toString()}><Link  href="/" as={'/' + item.get('filename')}>
          <a>{item.get('menutitle')}</a>
          </Link></li>;
        })}
      </ul>
    </div>
  )
}

export const getDynamicProps = async props => {
  const data = {};

  //console.log("DYN CALLED",props);
  console.clear();

  if (
    typeof props.sourcetype !== 'undefined' &&
    props.sourcetype === 'localindex' &&
    Mura.isUUID(props.source)
  ) {
    const entity = await Mura.getFeed('content')
      .where()
      .andProp('feedid').isEQ(props.source);
      
    const query = await entity.getQuery();
//    data.items = query.property.items;
    
    data.rawCollection = query.getAll();

  }

  return data;
};


export default Collection;
