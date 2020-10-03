import { useState } from "react";
import React from 'react';
import ReactMarkdown from "react-markdown";
import ItemDate from '../ItemDate';

import Slider from "react-slick";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
/*
  The link component throws an error when rerending after being 
  reconfigured in edit mode. Hence CollectionLink
*/



const CollectionLayoutSlickSlider = ({props,collection,link}) => {

  const slides = collection.map((item) => (
      <SliderItem 
        contentid={item.get('contentid')}
        image={item.get('images').landscape}
        filename={item.get('filename')}
        link={link}
      />
  ))

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
      slides != null && slides.length > 0 && 
      <Slider {...settings}>
        {slides}
      </Slider>
  )
}

const SliderItem = (props) => {
  const Link = props.link;
  return(
    <div key={props.contentid}>
      <Link href={`/${props.filename}`} passHref>
        <img src={props.image} />
      </Link>
    </div>
  )
}

/*
  This is not required; it is used to retrieve the required fields when populated getStatic/getServerSide props
*/
export const getQueryProps = () => {
  const data = {};
  data['fields'] = "title,summary";

  return data;
};

export default CollectionLayoutSlickSlider;