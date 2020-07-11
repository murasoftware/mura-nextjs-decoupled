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
  const DynamicCollectionLayout = getLayout(objectparams.layout);
  /*
    hasRouter exists because when reconfigured via layout manager 
    in edit mode the next/link argument throws an error because it 
    does not have access to the router
  */
  if(!objectparams.dynamicProps){
    const hasRouter=false;
    const [collection,setCollection]=useState(false);
    useEffect(() => {
      getDynamicProps(objectparams).then((dynamicProps)=>{
       
        setCollection(new Mura.EntityCollection(dynamicProps.collection,Mura._requestcontext));
      });   

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
  } else {
    const hasRouter=true;
    const collection=new Mura.EntityCollection(objectparams.dynamicProps.collection,Mura._requestcontext);
      return (
        <DynamicCollectionLayout collection={collection} props={props} hasRouter={hasRouter}/>
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
