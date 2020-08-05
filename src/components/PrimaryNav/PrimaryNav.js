import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Mura from 'mura.js';

function PrimaryNav(props) {
  const objectparams = Object.assign({}, props);

  if(!objectparams.dynamicProps){
    const [items, setItems]=useState('');

    useEffect(() => {
        getDynamicProps(objectparams).then((dynamicProps)=>{
          setItems(dynamicProps.items);
        });
    },[]);

    if(items){
      return (
        <Render items={items} link={RouterlessLink} />
      );
    } else {
      return (
        <div></div>
        );
    }
  } else {
    return (
      <Render items={objectparams.dynamicProps.items} link={RouterLink}/>
    );
  }
}

const Render = ({ items, link }) => {
    const Link=link;

    return (
    <div>
        <nav>
        <ul>
            {items &&
            items.map(item => (
                <Link key={item.contentid} href={`/${item.filename}`}>
                {item.menutitle}
                </Link>
            ))}
        </ul>
        </nav>
    </div>
    )
};

export const getDynamicProps = async props => {

  return {
    items: await Mura.getFeed('content')
    .where()
    .prop('parentid')
    .isEQ(Mura.homeid)
    .sort('orderno')
    .getQuery()
    .then(collection => {
      let tempArray = collection.getAll().items;
      tempArray.unshift({
        url: '/',
        menutitle: 'Home',
        title: 'Home',
        filename: '',
        contentid: Mura.homeid,
      });
      return tempArray;
    })
  };
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

export default PrimaryNav;
