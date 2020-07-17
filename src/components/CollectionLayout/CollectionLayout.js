import { useState } from "react";
import ReactMarkdown from "react-markdown";
import CollectionNav from '../CollectionNav/CollectionNav';

const CollectionLayout = ({props,collection,link}) => {
  const [pos, setPos] = useState(0);

  return (
    <div>
      <h2>CollectionLayout!</h2>
      <ul style={{'listStyle': 'none'}}>
        <CurrentItems collection={collection} pos={pos} link={link} {...props} />
      </ul>
      <CollectionNav collection={collection} pos={pos} setPos={setPos} link={link} {...props} />   
  </div>
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
    <li key={item.get('contentid')}>
        <h1>
          <Link href={`/${item.get('filename')}`}>
            {item.get('title')}
          </Link>
        </h1>
        <ReactMarkdown source={item.get('summary')}/>
    </li>
    );
  }

  return itemsList;
}

/*
  This is not required; it is used to retrieve the required fields when populated getStatic/getServerSide props
*/
export const getQueryProps = () => {
  const data = {};
  
  /*
    You wouldn't really need to set this because
    both of these are available in the default field list
  */
  data['fields'] = "title,summary";

  return data;
};

export default CollectionLayout;