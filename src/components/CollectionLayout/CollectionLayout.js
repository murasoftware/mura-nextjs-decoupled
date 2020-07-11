import React from 'react';

/*
  The link component throws an error when rerending after being 
  reconfigured in edit mode. Hence CollectionLink
*/
const CollectionLayout = ({props,collection,link}) => {
  const Link=link;
  return (
    <div>
      <ul>
        {collection.get('items').map(function(item, i){
          return <li key={item.get('contentid')}>
            <Link href={`/${item.get('filename')}`}>
              {item.get('title')}
            </Link>
          </li>;
        })}
      </ul>
    </div>
  )
}

export default CollectionLayout;