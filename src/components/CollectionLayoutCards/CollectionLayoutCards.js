import { useState } from "react";
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ReactMarkdown from "react-markdown";
import CollectionNav from '../CollectionNav/CollectionNav';
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
  const {collection,nextn,link,pos,fields} = props;
  let itemsList = [];
  let item = '';
  const Link = link;
  const items = collection.get('items');
  const itemsTo = pos+nextn > items.length ? items.length : pos+nextn;
  const fieldlist = fields ? fields.toLowerCase().split(",") : [];
  console.log(fieldlist);

  for(let i = pos;i < itemsTo;i++) {
    item = items[i];
    itemsList.push(
      
    <div className="col mb-4" key={item.get('contentid')}>
      <Card className="mb-3 h-100 shadow">
        <Card.Img variant="top" src={item.get('images').landscape} />
        <Card.Body>
          <div className="mura-item-meta">
            {
            fieldlist.map(field => {
              switch(field) {
                case "title":
                  return (
                    <Card.Title key={field}>{item.get('title')}</Card.Title>
                  )
                case "date":
                    return (
                      <div className="mura-item-meta__date" key="date">
                        <ItemDate releasedate={item.get('releasedate')} lastupdate={item.get('lastupdate')}></ItemDate>
                      </div>
                    );
                case "summary":
                  return <ReactMarkdown source={item.get('summary')} key={field} />
                default:
                  return <div className={`mura-item-meta__${field}`} key={field} data-value={field}>{item.get(field)}</div>
              }        
            })
            }
          </div>
        </Card.Body>
        <Card.Footer>
          {/* <Button key="readmore" as={Link} href={`/${item.get('filename')}`} variant="primary" className="stretched-link">
					  Learn More
					</Button> */}
          <Link href={`/${item.get('filename')}`} passHref className="stretched-link">
            Learn More
          </Link>
        </Card.Footer>

      </Card>
    </div>
    );
  }

  return itemsList;
}

const ItemDate = (props) => {
  let date = '';
  let formatteddate = '';

  if(props.releasedate){
    date = props.releasedate;
  } else {
    date = props.lastupdate
  }
  console.log(date);
  //
  //need to format the date, not sure why the below doesn't work
  //
  //formatteddate = Intl.DateTimeFormat("en-US", {year: "numeric",month: "long",day: "2-digit"}).format(date);
  formatteddate = date;

  return (
      formatteddate
  )
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