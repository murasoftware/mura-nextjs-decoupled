import React,{useState,useEffect} from 'react';
import Mura from 'mura.js';
import Link from "next/link";
import { useRouter } from 'next/router';
import moduleLookup from '../../helpers/ComponentRegistry';

const getLayout=(layout) => {

  const uselayout = layout == 'default' ? "DefaultLayout" : layout;

  if(typeof moduleLookup[uselayout] != 'undefined') {
    return moduleLookup[uselayout];
  } else {
    console.log("Layout not registered: ",layout);
    return moduleLookup['DefaultLayout'];
  }
}

function Collection(props) {
  const objectparams = Object.assign({}, props);
  const DynamicCollectionLayout = getLayout(objectparams.layout).component;
  const router = useRouter();
  const {content} = props;

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

export const getDynamicProps = async (item) => {
  const data = {};

  // children collection
  // TODO
  // related content collection
  // TODO
  // feed collection
  let {content} = item;

  if(content.getAll) {
    content = content.getAll();
  }

// E01B7C64-1E17-41B3-8E20CD775D9B592F

  if(item.sourcetype === 'children') {
    const feed = Mura.getFeed('content');

    feed.andProp('parentid').isEQ(content.contentid);
    feed.fields(getDisplayListFields(item));

    const query = await feed.getQuery();
    data.collection = query.getAll();
  }
  else if(item.sourcetype === 'relatedcontent') {
    const feed = Mura.getFeed('content');

    feed.andProp('parentid').isEQ(content.contentid);

    feed.fields(getDisplayListFields(item));

    const query = await feed.getQuery();
    data.collection = query.getAll();
  }
  else if ((
    typeof item.sourcetype === 'undefined'
    || item.sourcetype === ''
    ) 
    ||  (
      typeof item.sourcetype !== 'undefined' &&
      item.sourcetype === 'localindex' &&
      Mura.isUUID(item.source)
    )
  ) {
    const feed = Mura.getFeed('content');

    if(item.source) {
      feed.andProp('feedid').isEQ(item.source);
    }
    
    feed.fields(getDisplayListFields(item));

    feed.maxItems(item.maxitems);
    feed.itemsPerPage(0);

    //Add stuff like maxitems, nextn
      
    const query = await feed.getQuery();

    data.collection = query.getAll();
//    console.log("COLLECTION",data.collection);

  }

  return data;
};

const getDisplayListFields = (item) => {

  const data = getLayout(item.layout).getStaticProps();

  let fieldlist = '';

  if(data.fields) {
    fieldlist = data.fields;
  }
  else {
    fieldlist = item.displaylist ? item.displaylist : data.fields ? data.fields : '';
  }

  if(!fieldlist)
    return '';
  
  const hasFilename=fieldlist.split(",").find(fieldlist=>fieldlist==='filename');
  
  if(!hasFilename){
    fieldlist += ",filename";
  }

  return fieldlist;
}


export default Collection;