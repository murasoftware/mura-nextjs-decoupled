import React,{useState,useEffect} from 'react';
import Mura from 'mura.js';
import CollectionLayout from '../CollectionLayout';

const LayoutRegistry = {
  CollectionLayout
};

const getLayout=(layout) => {
  if(typeof LayoutRegistry[layout] != 'undefined'){
    return LayoutRegistry[layout];
  } else {
    return CollectionLayout;
  }
}

function Collection(props) {
  const objectparams = Object.assign({}, props);
  const [collection,setCollection]=useState(false);
  const DynamicCollectionLayout = getLayout(objectparams.layout);
  let hasRouter=false;

  useEffect(() => {
      if( objectparams.dynamicProps){
        hasRouter=true;
        setCollection(new Mura.EntityCollection(objectparams.dynamicProps.collection,Mura._requestcontext));
      } else {
        getDynamicProps(objectparams).then((dynamicProps)=>{
          hasRouter=false;
          setCollection(new Mura.EntityCollection(dynamicProps.collection,Mura._requestcontext));
        });   
      }
  }, []);
  
  if(collection) {
    return (
      <DynamicCollectionLayout collection={collection} props={props} hasRouter={hasRouter}/>
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
  if ((
    typeof props.sourcetype === 'undefined'
    || props.sourcetype === ''
    ) 
    ||  (
      typeof props.sourcetype !== 'undefined' &&
      props.sourcetype === 'localindex' &&
      Mura.isUUID(props.source)
    )
  ) {
    const feed = Mura.getFeed('content')

    if(props.source){
      feed.andProp('feedid').isEQ(props.source);
    }

    if(props.displaylist){
      feed.fields(props.displaylist);
    } else if(props.fields){
      feed.fields(props.fields);
    }

    //Add stuff like maxitems, nextn
      
    const query = await feed.getQuery();
    
    data.collection = query.getAll();

  }

  return data;
};


export default Collection;
