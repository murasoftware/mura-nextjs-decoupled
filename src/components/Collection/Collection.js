import React,{useState,useEffect} from 'react';
import Mura from 'mura.js';
import Link from "next/link";
import ComponentRegistry from '../../helpers/ComponentRegistry';

const getLayout=(layout) => {

  const uselayout = layout == 'default' ? "DefaultLayout" : layout;

  if(typeof ComponentRegistry[uselayout] != 'undefined') {
    return ComponentRegistry[uselayout];
  } else {
    console.log("Layout not registered: ",layout);
    return ComponentRegistry['DefaultLayout'];
  }
}

function Collection(props) {
  const objectparams = Object.assign({}, props);
  const DynamicCollectionLayout = getLayout(objectparams.layout).component;
  const renderCollection = (collection) => {
    if(collection) {
      if(objectparams.scrollpages){
        return (
          <div>
            <DynamicCollectionLayout collection={collection} props={props} link={RouterlessLink}/>
            <div className="mura-collecion-end" data-instanceid={objectparams.instanceid}></div>
          </div>
        )
      } else {
        return (
          <DynamicCollectionLayout collection={collection} props={props} link={RouterlessLink}/>
        )
      }
    } else {
      return (
         <div></div>
        )
    }
  }

  if(!objectparams.dynamicProps){
    const [collection,setCollection]=useState(false);
    useEffect(() => {
      getDynamicProps(objectparams).then((dynamicProps)=>{
        setCollection(new Mura.EntityCollection(dynamicProps.collection,Mura._requestcontext));
      });   

    }, []);
    return renderCollection(collection);
  } else {
    const collection=new Mura.EntityCollection(objectparams.dynamicProps.collection,Mura._requestcontext);
    return renderCollection(collection);
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
  let cdata = {};
  let {content} = item;

// E01B7C64-1E17-41B3-8E20CD775D9B592F

  if(item.sourcetype === 'children') {
    const feed = Mura.getFeed('content');

    if(content.getAll) {
      cdata = content.getAll();
    }
    else {
      cdata = content;
    }
  
    feed.andProp('parentid').isEQ(cdata.contentid);
    feed.fields(getSelectFields(item));
    feed.expand(getExpandFields(item));

    const query = await feed.getQuery();
    data.collection = query.getAll();
  }
  else if(item.sourcetype === 'relatedcontent') {
    const src = item.source;
   
    if(src==='custom'){
      if(typeof item.items !='undefined'){
        if(!Array.isArray(item.items)){
          try{
            JSON.parse(item.items);
          } catch(e){
            console.log(e)
            item.items=[];
          }
        }
      } else {
        item.items=[];
      }

      if(item.items.length){
        const related = await Mura.getFeed('content')
        .where()
        .fields(getSelectFields(item))
        .expand(getExpandFields(item))
        .itemsPerPage(0)
        .maxItems(item.maxitems)
        .findMany(item.items)
        .getQuery();
        
        data.collection=related.getAll();
      } else {
        data.collection={
          items: [],
          totaltems: 0,
        }
      }
    } else {
      if(!content.getRelatedContent){
        content=Mura.getEntity("content").set(content);
      }
      const related = await content.getRelatedContent(
        src,
        {
          fields:getSelectFields(item),
          expand:getExpandFields(item),
          itemsPerPage:0,
          maxitems:item.maxitems
        }
      );
      data.collection = related.getAll(); 
    }
    return data;
  }
  else {
    const feed = Mura.getFeed('content');

    if(item.source) {
      feed.andProp('feedid').isEQ(item.source);
    }
    
    feed.fields(getSelectFields(item));
    feed.expand(getExpandFields(item));
    
    feed.maxItems(item.maxitems);
    feed.itemsPerPage(0);

    //Add stuff like maxitems, nextn
      
    const query = await feed.getQuery();

    data.collection = query.getAll();
  }

  return data;
};

const getExpandFields = (item) => {

  const data = getLayout(item.layout).getQueryProps();

  if(data.expand){
    return data.expand;
  } else {
    return '';
  }

}

const getSelectFields = (item) => {

  const data = getLayout(item.layout).getQueryProps();

  let fieldlist = '';

  if(data.fields) {
    fieldlist = data.fields;
  } else {
    fieldlist = data.fields ? data.fields  : '';
  }

  if(!fieldlist){
    return '';
  }

  let fieldarray=fieldlist.split(",");
  let hasDate=false;
  let hasFilename=false;
  let hasReleaseDate=false;
  let hasLastUpdate=false;
  let hasCreated=false;
  let hasImage=false;
  let hasFileid=false;
  let hasContentid=false;
  let hasContenthistid=false;
  let hasParentid=false;

  fieldarray=fieldarray.filter(field=>{
    field=field.toLowerCase();
    if(field==='filename'){
      hasFilename=true;
    } else if(field==='date'){
      hasDate=true;
      return false;
    } else if(field==='image'){
      hasImage=true;
      return false;
    } else if(field==='fileid'){
      hasFileid=true;
    } else if(field==='contentid'){
      hasContentid=true;
    } else if(field==='contenthistid'){
      hasContenthistid=true;
    } else if(field==='parentid'){
      hasParentid=true;
    } 
    return true;
  });

  //There is no generic date field.  If selected these are the options
  if(hasDate){
    if(!hasReleaseDate){
      fieldarray.push('releasedate');
    } 
    if(!hasLastUpdate){
      fieldarray.push('lastupdate');
    }
    if(!hasCreated){
      fieldarray.push('created');
    }
  }
  if(hasImage){
    if(!hasFileid){
      fieldarray.push('fileid');
    }
    fieldarray.push('images');
  }
  if(!hasFilename){
    fieldarray.push('filename');
  }
  if(!hasContentid){
    fieldarray.push('contentid');
  }
  if(!hasContenthistid){
    fieldarray.push('contenthistid');
  }
  if(!hasParentid){
    fieldarray.push('parentid');
  }
  return fieldarray.join(',').toLowerCase();
}


export default Collection;