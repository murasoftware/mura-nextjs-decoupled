import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Mura from 'mura.js';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

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
        <Navbar.Brand href="/">Mura-NextJS</Navbar.Brand>
        <Navbar.Toggle aria-controls="primary-nav" />
        <Navbar.Collapse id="primary-nav">
          <Nav className="ml-auto">
            {/* {items &&
            items.map(item => (
              <li className="nav-item" key={item.contentid}>
                <Link href={`/${item.filename}`}>
                  {item.menutitle}
                </Link>
              </li>
            ))} */}
            {items && items.map((item) => {
                //if not home, return a dropdown if the item has children
                if (item.menutitle != 'Home') {
                    return (
                      <NavLinkDropdown key={item.contentid} contentid={item.contentid} filename={item.filename} menutitle={item.menutitle} />
                    )
                }
                //otherwise return just the "home" link item
                return (
                  <li className="nav-item" key={item.contentid}>
                    <Link href={`/${item.filename}`}>{item.menutitle}</Link>
                  </li>
                )
                }
            )}
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

const RouterlessLink = ({href,children,className})=>{
    return (
      <a href={href} className={classname}>
        {children}
      </a>
    );
  }
  
  const RouterLink = ({href,children,className})=>{
    return (
      <Link href={href}>
        <a className={className}>{children}</a>
      </Link>
    );
  }

//need to move this to MuraHelper for Static rendering
async function getDropdownNavData(itemid) {
  return Mura.getFeed('content')
    .where()
    .prop('parentid')
    .isEQ(itemid)
    .sort('orderno','asc')
    .getQuery()
    .then(collection => {
      let kidsArray = collection.getAll().items;
      return kidsArray;
    });
}

const NavLinkDropdown = props => {
  //const {contentid,filename,menutitle} = props;
  const [Items,setItems]=useState(false);  

  useEffect(() => {
    let isMounted = true;
    getDropdownNavData(props.contentid).then((response)=>{
      if (isMounted) setItems(response);
    })
    return () => { isMounted = false }; // use effect cleanup to set flag false, if unmounted
  },[]);
  
  // if item has children create dropdown
  // QUESTION:::can we make the navdropdown clickable/link or do we need to make a custom component to make it work on hover on desktop?
  if (Items.length) {
    return (
      <>
      <NavDropdown key={props.contentid} title={props.menutitle} id={`dropdown-${props.contentid}`} href={`/${props.filename}`} renderMenuOnMount={true}>
        <Link key={props.contentid} href={`/${props.filename}`} className="dropdown-item">{props.menutitle}</Link>
      {Items && Items.map((item) => {
        return(
          <Link key={item.contentid} href={`/${item.filename}`} className="dropdown-item">{item.menutitle}</Link>
        )
      })}
      </NavDropdown>
      </>
    )
  }
  // if item doesn't have children create link
  return (
    // <Nav.Link href={`/${props.filename}`}>{props.menutitle}</Nav.Link>
    <li className="nav-item">
      <Link key={props.contentid} href={`/${props.filename}`}>{props.menutitle}</Link>
    </li>
  )

}
export default PrimaryNav;
