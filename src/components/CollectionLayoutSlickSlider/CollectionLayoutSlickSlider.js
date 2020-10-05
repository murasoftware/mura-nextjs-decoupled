import { useState } from "react";
import React from 'react';
import Card from 'react-bootstrap/Card';
import ReactMarkdown from "react-markdown";
import ItemDate from '../ItemDate';

import Slider from "react-slick";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
/*
  The link component throws an error when rerending after being 
  reconfigured in edit mode. Hence CollectionLink
*/

const CollectionLayoutSlickSlider = ({props,collection,link}) => {

  function CustomNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: "black" }}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    );
  }
  
  function CustomPrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: "black" }}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
    );    
  }  
  
  const slides = collection.map((item) => (
      <SliderItem 
        image={item.get('images').landscape}//why can't I get this in SliderItem
        item={item}
        link={link}
        slidestoshow={Number(props.slidestoshow)}
        {...props}
        key={item.get('contentid')}
      />
  ))
  
  //console.log('slidesToShow: ' + props.slidestoshow + ' slidesToScroll: ' + props.slidestoscroll + ' objectID: ' + props.objectid);

  return (
      slides != null && slides.length > 0 &&
      <div className="collectionLayoutSlickSlider">
        <Slider 
        dots={props.dots}
        arrows={props.arrows}
        infinite={props.infinite}
        speed={Number(props.speed)}
        slidesToShow={Number(props.slidestoshow)}
        slidesToScroll={Number(props.slidestoscroll)}
        autoplay={props.autoplay}
        autoplaySpeed={Number(props.autoplayspeed)}
        centerMode={props.centermode}
        centerPadding={props.centerpadding}
        fade={props.fade}
        lazyLoad={props.lazyload}
        rows={Number(props.rows)}
        slidesPerRow={Number(props.sliderperrow)}
        vertical={props.vertical}
        verticalSwiping={props.verticalswiping}
        nextArrow={<CustomNextArrow />}
        prevArrow={<CustomPrevArrow />}
        key={props.objectid}>
        {slides}
      </Slider>
      </div>
  )
}

const SliderItem = (props) => {
  const item = props.item;
  const slidesToShow = props.slidesToShow;
  const Link = props.link;
  const fieldlist = props.fields ? props.fields.toLowerCase().split(",") : [];
  //console.log(fieldlist);
  if (fieldlist.length === 1 && fieldlist[0] === 'image') {
    return(
      <div key={item.get('contentid')} className="h-100">
        <Link href={`/${item.get('filename')}`} passHref>
          <img src={props.image} />
        </Link>
      </div>
    )
  } else {
    return(
      <div className="mx-2 h-100" key={props.contentid} >
        <Card className="border-0 h-100">
          <Link href={`/${props.filename}`} passHref>
            <img src={props.image} className="card-img-top" />
          </Link>
          <Card.Body className="spacing-normal h-100">
              <div className="mura-item-meta">
                {
                fieldlist.map(field => {
                  switch(field) {
                    case "title":
                      return (
                        <Card.Title key={field}>{item.get('title')}</Card.Title>
                      )
                    case "date":
                        return (
                          <div className="mura-item-meta__date" key="date">
                            <ItemDate releasedate={item.get('releasedate')} lastupdate={item.get('lastupdate')}></ItemDate>
                          </div>
                        );
                    case "summary":
                      return <ReactMarkdown source={item.get('summary')} key={field} />
                    case "readmore":
                      return(
                        <Link href={`/${item.get('filename')}`} passHref className="stretched-link btn btn-primary" key={item.get('contentid')}>
                          Read More  <FontAwesomeIcon icon={faChevronRight} />
                        </Link>
                      );
                    default:
                      return <div className={`mura-item-meta__${field}`} key={field} data-value={item.get(field)}>{item.get(field)}</div>
                  }        
                })
                }
              </div>
            </Card.Body>
        </Card>
      </div>   
    )
  }

  

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