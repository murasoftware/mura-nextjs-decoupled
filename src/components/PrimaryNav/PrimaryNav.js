import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Mura from 'mura.js';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

function PrimaryNav(props) {
  const objectparams = Object.assign({}, props);
  // console.log(props);
  if(!objectparams.dynamicProps){
    const [items, setItems]=useState('');

    useEffect(() => {
        getDynamicProps(objectparams).then((dynamicProps)=>{
          setItems(dynamicProps.items);
        });
    },[]);

    if(items){
      return (
        <Render items={items} link={RouterlessLink} props={props} />
      );
    } else {
      return (
        <div></div>
        );
    }
  } else {
    return (
      <Render items={objectparams.dynamicProps.items} link={RouterLink} props={props}/>
    );
  }
}

const Render = ({ items, link, ...props }) => {
    const Link=link;
    // console.log(props.props.displayhome);
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
            <Homelink displayhome={props.props.displayhome} />
            
            {items.filter(item => item.parentid === '00000000000000000000000000000000001').map(filtereditem => {
                  const children = items.filter(item => item.parentid === filtereditem.contentid);
                  return (  
                    <NavLinkDropdown key={filtereditem.contentid} contentid={filtereditem.contentid} filename={filtereditem.filename} menutitle={filtereditem.menutitle} children={children} />
                  )
            })}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    )
};

export const getDynamicProps = async props => {

  return {
    items: await Mura.getFeed('content')
    // .where()
    // .prop('parentid')
    // .isEQ(Mura.homeid)
    .maxItems(0)
    .itemsPerPage(0)
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
      <a href={href} className={className}>
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

  const Homelink = ({displayhome}) => {
    // console.log(displayhome);
    if (displayhome){
      return (
        <li className="nav-item">
          <Link key={Mura.homeid} href="/" className="nav-link">Home</Link>
        </li>        
      )
    }
    return (
      <></>
    )
  }

const NavLinkDropdown = props => {
  const children = props.children;
  
  if (children.length) {
    return (
      <>
      <NavDropdown key={props.contentid} title={props.menutitle} id={`dropdown-${props.contentid}`} href={`/${props.filename}`} renderMenuOnMount={true}>
        {/* placing the main nav item in the dropdown for now since the parent nav item is not a clickable link */}
        <Link key={props.contentid} href={`/${props.filename}`} className="dropdown-item">{props.menutitle}</Link>
        {/* if there are children, build the rest of the dropdown */}
        {children && children.map((child) => {
          return(
            <Link key={child.contentid} href={`/${child.filename}`} className="dropdown-item">{child.menutitle}</Link>
          )
        })}
      </NavDropdown>
      </>
    )
  }
  // if item doesn't have children create a link
  return (
    <li className="nav-item">
      <Link key={props.contentid} href={`/${props.filename}`}>{props.menutitle}</Link>
    </li>
  )

}
export default PrimaryNav;
