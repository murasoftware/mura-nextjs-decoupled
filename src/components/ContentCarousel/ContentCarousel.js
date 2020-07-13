import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import { isMobile } from '@utils/screenSize';
import ContentSource from '@components/ContentSource';
import SourceLabel from '@components/SourceLabel';
import ArticleSlide from '@components/ArticleSlide';

import { LeftCarouselArrow, RightCarouselArrow } from '@components/Icons/Icons';

import ArrowLink from '@components/ArrowLink';
import {
  LeftColumn,
  RightColumn,
  FadingItems,
  Controls,
  FadingItem,
  ArrowButton,
  Count,
  ContentCarousel,
} from './ContentCarousel.style';

const leftItemTemp = [
  {
    img: 'https://via.placeholder.com/120',
    title: 'Title 1',
    description: 'Descritpion 1',
  },
  {
    img: 'https://via.placeholder.com/120',
    title: 'Title 2',
    description: 'Descritpion 2',
  },
  {
    img: 'https://via.placeholder.com/120',
    title: 'Title 3',
    description: 'Descritpion 3',
  },
];

const rightItemTemp = [
  <ArticleSlide
    title="Unlocking Capital Markets to Finance MDGs"
    // eslint-disable-next-line
    description="With more than $5-7 trillion required annually in additional capital to achieve the UN’s Sustainable Development Goals, a focus on accelerating progress among institutional asset owners and managers – who collectively hold ~$200T of investable AUM – could drive dramatic increases in financing the SDGs. "
  />,
  <ArticleSlide
    title="Unlocking Capital Markets to Finance MDGs"
    // eslint-disable-next-line
    description="With more than $5-7 trillion required annually in additional capital to achieve the UN’s Sustainable Development Goals, a focus on accelerating progress among institutional asset owners and managers – who collectively hold ~$200T of investable AUM – could drive dramatic increases in financing the SDGs. "
  />,
  <ArticleSlide
    title="Unlocking Capital Markets to Finance MDGs"
    // eslint-disable-next-line
    description="With more than $5-7 trillion required annually in additional capital to achieve the UN’s Sustainable Development Goals, a focus on accelerating progress among institutional asset owners and managers – who collectively hold ~$200T of investable AUM – could drive dramatic increases in financing the SDGs. "
  />,
];

const ContentCarouselComponent = (props) => {
  console.log(props)
  const {
    seeAllText = 'See all Insights',
    seeAllLink = 'https://www.iextrading.com',
    leftItems = leftItemTemp,
    rightItems = rightItemTemp,
  } = props;
  if (leftItems.length !== rightItems.length) {
    throw new Error('Content Carousel | Lenths are not equal');
  }
  const carouselRef = useRef(null);
  const [isMobileVal, setIsMobileVal] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    setIsMobileVal(isMobile());
  }, []);

  const settings = {
    dots: isMobileVal,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    swipeToSlide: true,
    rows: 1,
    arrows: false,
  };

  const nextClick = () => {
    carouselRef.current.slickNext();
    setActiveItem(activeItem + 1);
  };

  const prevClick = () => {
    carouselRef.current.slickPrev();
    setActiveItem(activeItem - 1);
  };

  return (
    <ContentCarousel>
      <LeftColumn lcols={4}>
        <FadingItems>
          {leftItems.map(({ img, title, description }, i) => (
            <FadingItem isActive={i === activeItem}>
              <ContentSource
                img={img}
                title={title}
                description={description}
              />
            </FadingItem>
          ))}
        </FadingItems>
        <Controls>
          <ArrowButton onClick={prevClick}>
            <LeftCarouselArrow />
          </ArrowButton>
          <Count>
            {activeItem} of {rightItems.length}
          </Count>
          <ArrowButton onClick={nextClick}>
            <RightCarouselArrow />
          </ArrowButton>
        </Controls>
      </LeftColumn>
      <RightColumn lcols={8}>
        <SourceLabel />
        <Slider {...settings} ref={carouselRef}>
          {rightItems}
        </Slider>
        <ArrowLink link={seeAllLink} text={seeAllText} />
      </RightColumn>
    </ContentCarousel>
  );
};

export default ContentCarouselComponent;
