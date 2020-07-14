import React from 'react';

/*
  The link component throws an error when rerending after being 
  reconfigured in edit mode. Hence DefaultLink
*/
const DefaultLayout = ({props,collection,link}) => {
  const Link=link;

  console.log("DefaultLayout",collection);
  const items = collection.get('items');
  let itemsList = [];

  console.log('n',collection.nextn);

  for(let i = 0;i < collection.nextn;i++) {
    let item = items[i];
    itemsList.push(
    <li key={item.get('contentid')}>
      <Link href={`/${item.get('filename')}`}>
        {item.get('title')}
      </Link>
    </li>
    );
  }

  return (
    <div>
      <ul>
        {itemsList}
        {/*collection.get('items').map(function(item, i) {
          return <li key={item.get('contentid')}>
            <Link href={`/${item.get('filename')}`}>
              {item.get('title')}
            </Link>
          </li>;
        })*/}
      </ul>
    </div>
  )
}

export default DefaultLayout;