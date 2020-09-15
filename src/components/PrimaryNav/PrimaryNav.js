import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Mura from 'mura.js';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

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
      <Navbar bg="white" variant="light" expand="lg" className="navbar-static-top py-4 shadow-sm">
      <div className="container-xl">
        <Navbar.Brand href="/">Mura-NextJS-Decoupled</Navbar.Brand>
        <Navbar.Toggle aria-controls="primary-nav" />
        <Navbar.Collapse id="primary-nav">
          <Nav className="ml-auto">
            {items &&
            items.map(item => (
              <li className="nav-item" key={item.contentid}>
                <Link href={`/${item.filename}`}>
                  {item.menutitle}
                </Link>
              </li>
            ))}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
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
