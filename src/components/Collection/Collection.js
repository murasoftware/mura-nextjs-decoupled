import React,{useState,useEffect} from 'react';
import Mura from 'mura.js';
import Link from "next/link";

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

  if(!objectparams.dynamicProps){
    const [collection,setCollection]=useState(false);
    useEffect(() => {
      getDynamicProps(objectparams).then((dynamicProps)=>{
        setCollection(new Mura.EntityCollection(dynamicProps.collection,Mura._requestcontext));
      });   

    }, []);
    if(collection) {
      return (
        <DynamicCollectionLayout collection={collection} props={props} link={RouterlessLink}/>
      )
    }
    else {
      return (
       <div></div>
      )
    }
  } else {
    const collection=new Mura.EntityCollection(objectparams.dynamicProps.collection,Mura._requestcontext);
      return (
        <DynamicCollectionLayout collection={collection} props={props} link={RouterLink}/>
      )
  }
}

const RouterlessLink = ({href,children})=>{
  return (
    <a href={href}>
      {children}
    </a>
  );
}

const RouterLink = ({href,children})=>{
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  );
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
    
    let fields='';
    if(props.displaylist){
      fields=props.displaylist;
    } else if(props.fields){
      fields=props.fields;
    }

    if(fields){
      const hasFilename=fields.split(",").find(field=>field==='filename');
      if(!hasFilename){
        fields += ",filename";
      }
      feed.fields(fields);
    }

    //Add stuff like maxitems, nextn
      
    const query = await feed.getQuery();
    
    data.collection = query.getAll();

  }

  return data;
};


export default Collection;
