import React from 'react';

const MasterLayout = ({props,collection,link}) => {
  const Link=link;

  return (
    <div>
      <h2>Master Layout!</h2>
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

export default MasterLayout;