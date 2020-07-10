import React,{useState} from 'react';
import Link from "next/link";

const CollectionLayout = ({props,collection}) => {
  return (
    <div>
      <ul>
        {collection.get('items').map(function(item, i){
          return <li key={item.get('contentid').toString()}><Link  href="/" as={'/' + item.get('filename')}>
          <a>{item.get('menutitle')}</a>
          </Link></li>;
        })}
      </ul>
    </div>
  )
}

export default CollectionLayout;