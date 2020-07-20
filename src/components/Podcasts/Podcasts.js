import React from 'react';
import ArrowLink from '@components/ArrowLink';
import SourceLabel from '@components/SourceLabel';
import {
  AbsoluteRow,
  BackgroundImage,
  BgColumnLeft,
  BgColumnRight,
  EpisodeNumber,
  EpisodeTitle,
  EpisodeDescription,
  EpisodeDate,
  PodcastsContainer,
  PodcastInfo,
  LeftColumn,
  SectionInfo,
  SectionLogo, 
  SourceContainer,
  Background,
  SectionTitleImage
} from './Podcasts.style';

const Podcast = props => {
  const featuredPodcast = props.collection.properties.items[0].properties;
  const {
    props: {
      bgimageleft,
      bgimageright,
      sectiontitle,
      sectiontitleimage,
      viewallcta,
      viewallctaurl
    }
  } = props;
  const {
    episodedate,
    episodedescription,
    epidsodenumber,
    episodetitle,
  } = featuredPodcast;

  const renderLeftColumnTitle = () => (
    sectiontitleimage
      ? <SectionTitleImage src={sectiontitleimage} alt="Section title Boxes AndLines" />
      : <span>{sectiontitle}</span>
  );

  return (
    <PodcastsContainer>
      <SectionInfo>
        <SectionLogo lcols={4} scols={12}>
          {renderLeftColumnTitle()}
        </SectionLogo>
        <SourceContainer lcols={8} scols={12}>
          <SourceLabel fromLabel='From IEX Exchage' contentType="Latest Podcasts" />
        </SourceContainer>
      </SectionInfo>

      <Background>
        <BgColumnLeft lcols={6} scols={6}> 
          <BackgroundImage src={bgimageleft} alt="Background Left - Ronan" />
        </BgColumnLeft>

        <BgColumnRight lcols={6} scols={6}>
          <BackgroundImage src={bgimageright} alt="Background Right - John" />
        </BgColumnRight>
      </Background>

      <AbsoluteRow>
        <LeftColumn lcols={4} scols={0}/>

        <PodcastInfo lcols={8} scols={12}>
          <EpisodeNumber>Ep.{epidsodenumber}</EpisodeNumber>
          <EpisodeTitle>{episodetitle}</EpisodeTitle>
          <EpisodeDescription>{episodedescription}</EpisodeDescription>
          <EpisodeDate>{episodedate}</EpisodeDate>
          <ArrowLink text={viewallcta} link={viewallctaurl}  />
        </PodcastInfo>
      </AbsoluteRow>
      
    </PodcastsContainer>
  )
}

export default Podcast;
