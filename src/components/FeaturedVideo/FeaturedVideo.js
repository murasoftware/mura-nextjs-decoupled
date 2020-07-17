import React, { useEffect, useState, useRef } from 'react';
import { youtubeDuration } from '@utils/formatters';
import SourceLabel from '@components/SourceLabel';
import ArrowLink from '@components/ArrowLink';
import { Column, ColumnContainer } from '@styles/atoms';
import YoutubePlayer from '@components/YoutubePlayer';
import { isMobile } from '@utils/screenSize';

import {
  FeaturedVideo,
  FeaturedVideoHeader,
  SourceContainer,
  LogoContainer,
  TitleContainer,
  TimeStamp,
  Logo,
  Title,
  VideoContainer,
} from './FeaturedVideo.style';

const FeaturedVideoComponent = ({
  businesssource,
  cta,
  ctalabel,
  logoimage,
  modulename,
  titleoverwrite,
  posterimage,
  youtubeid,
}) => {
  const [isMobileVal, setIsMobileVal] = useState(false);

  const [youtubeVideo, setYoutubeVideo] = useState({});
  const {
    contentDetails: { duration } = {},
    snippet: { title } = {},
  } = youtubeVideo;

  useEffect(() => {
    setIsMobileVal(isMobile());

    fetch(
      `${process.env.YOUTUBE_API}?part=snippet%2CcontentDetails%2Cstatistics&id=${youtubeid}&key=${process.env.YOUTUBE_API_KEY}`,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      },
    )
      .then(response => response.json())
      .then(json => {
        setYoutubeVideo(json.items.length > 0 ? json.items[0] : {});
      })
      .catch(() => {
        throw new Error('Failed to parse JSON for Market Stats');
      });
  }, []);

  return (
    <FeaturedVideo>
      <FeaturedVideoHeader>
        {!isMobileVal && (
          <LogoContainer lcols={4} mcols={12}>
            <Logo src={logoimage} alt="Behind the trade" />
          </LogoContainer>
        )}

        <SourceContainer lcols={4} mcols={12}>
          <SourceLabel fromLabel={businesssource} contentType={modulename} />
        </SourceContainer>
        {isMobileVal && (
          <LogoContainer lcols={4} mcols={12}>
            <Logo src={logoimage} alt="Behind the trade" />
          </LogoContainer>
        )}
        <TitleContainer lcols={4} mcols={12}>
          <Title>{titleoverwrite || title}</Title>
          <TimeStamp>{youtubeDuration(duration)}</TimeStamp>
        </TitleContainer>
      </FeaturedVideoHeader>
      <VideoContainer>
        <YoutubePlayer posterimage={posterimage} youtubeVideo={youtubeVideo} />
      </VideoContainer>
      {cta && ctalabel && (
        <ColumnContainer>
          <Column lcols={4} mcols={0} />
          <Column lcols={4} mcols={12}>
            <ArrowLink link={cta} text={ctalabel} />
          </Column>
        </ColumnContainer>
      )}
    </FeaturedVideo>
  );
};

export default FeaturedVideoComponent;
