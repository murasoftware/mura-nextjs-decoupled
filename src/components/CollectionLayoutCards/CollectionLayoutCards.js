import { useState } from "react";
import React from 'react';
import Card from 'react-bootstrap/Card';
import ReactMarkdown from "react-markdown";
import CollectionNav from '../CollectionNav/CollectionNav';
//import Card from 'react-bootstrap';
/*
  The link component throws an error when rerending after being 
  reconfigured in edit mode. Hence CollectionLink
*/
const CollectionLayoutCards = ({props,collection,link}) => {
  const [pos, setPos] = useState(0);
  return (
    <>
      <div className={`row collectionLayoutCards row-cols-1 row-cols-sm-${props.rowcolssm} row-cols-md-${props.rowcolsmd} row-cols-lg-${props.rowcolslg} row-cols-xl-${props.rowcolsxl}`}>
          <CurrentItems collection={collection} pos={pos} link={link} {...props} /> 
      </div>
      <div className="row">
        <div className="col-12">
        <CollectionNav collection={collection} pos={pos} setPos={setPos} link={link} {...props} />
        </div>
      </div>
    </>
  )
}

const CurrentItems = (props) => {
  const {collection,nextn,link,pos} = props;
  let itemsList = [];
  let item = '';
  const Link = link;
  const items = collection.get('items');
  const itemsTo = pos+nextn > items.length ? items.length : pos+nextn;

  for(let i = pos;i < itemsTo;i++) {
    item = items[i];
    itemsList.push(
    <div className="col mb-4" key={item.get('contentid')}>
      <Card className="mb-3 h-100 shadow">
        <Card.Img variant="top" src={item.get('images').landscape} />
        <Card.Body>
          <Card.Title><h3>{item.get('title')}</h3></Card.Title>
            <ReactMarkdown source={item.get('summary')}/>
        </Card.Body>
        <Card.Footer><a className="btn btn-primary" href={`/${item.get('filename')}`}>Learn More</a></Card.Footer>
      </Card>
    </div>
    );
  }

  return itemsList;
}

/*
  This is not required; it is used to retrieve the required fields when populated getStatic/getServerSide props
*/
export const getQueryProps = () => {
  const data = {};
  data['fields'] = "title,summary";

  return data;
};

export default CollectionLayoutCards;