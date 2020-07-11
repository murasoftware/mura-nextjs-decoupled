import React from 'react';
import Link from "next/link";
/*
  The link component throws an error when rerending after being 
  reconfigured in edit mode. So I think we'll another component that 
  can conditionally use the vanilla anchor tags when rerending.
*/
const CollectionLayout = ({props,collection,hasRouter}) => {
  return (
    <div>
      <ul>
        {collection.get('items').map(function(item, i){
          return <li key={item.get('contentid')}>
            <CollectionLink item={item}  hasRouter={hasRouter}>
              {item.get('title')}
            </CollectionLink>
          </li>;
        })}
      </ul>
    </div>
  )
}

const CollectionLink = ({item,hasRouter,children})=>{
  if(hasRouter){
    return (
      <Link href={`/${item.get('filename')}`}>
        <a>{children}</a>
     </Link>
    );
  } else {
    return (
      <a href={`/${item.get('filename')}`}>
        {children}
      </a>
    )
  }
}

export default CollectionLayout;