import React,{useState} from 'react';
import Mura from 'mura.js';
import CollectionLayout from '../CollectionLayout';

function Collection(props) {
  const objectparams = Object.assign({}, props);
  let initialRawCollection='';

  // pretending dynamic TODO
  objectparams.layout = "CollectionLayout";

  if( typeof objectparams.dynamicProps === 'undefined') {
    getDynamicProps(objectparams).then((dynamicProps)=>{
      setRawCollection(dynamicProps.rawCollection);
    });
  } else {
    initialRawCollection=objectparams.dynamicProps.rawCollection;
  }

  const [rawCollection, setRawCollection]=useState(initialRawCollection);
  
  if(rawCollection) {
    const collection = new Mura.EntityCollection(rawCollection,Mura._requestcontext);

    const DynamicCollectionLayout = CollectionLayout;

    return (
      <DynamicCollectionLayout collection={collection} props={props} />
    )
  }
  else {
    return (
     <div></div>
    )
  }
}

export const getDynamicProps = async props => {
  const data = {};

  // children collection
  // TODO
  // related content collection
  // TODO
  // feed collection
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
