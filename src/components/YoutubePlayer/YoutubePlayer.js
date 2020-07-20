import React, { useState, useRef } from 'react';

import { PlayButton } from '@components/Icons/Icons';

import {
  YoutubePlayerStyle,
  PosterImage,
  FeaturedPlayButton,
} from './YoutubePlayer.style';
import { AnalyticsClick } from '@helpers/Analytics';

const YoutubePlayer = ({ youtubeVideo, posterimage }) => {
  const videoContainer = useRef(null);

  const {
    id,
    snippet: {
      title,
      thumbnails: { maxres: { url: youtubePoster, width, height } = {} } = {},
    } = {},
  } = youtubeVideo;

  const [showPlayer, setShowPlayer] = useState(false);
  const [showYoutube, setHidePoster] = useState(false);

  const containerWidth =
    videoContainer &&
    videoContainer.current &&
    videoContainer.current.clientWidth;

  const aspect = height / width;
  const newHeight = containerWidth * aspect;

  const videoClick = () => {
    AnalyticsClick('videoClick', id);
    setShowPlayer(true);
  }

  const iframe = () => (
    <iframe
      title={title}
      src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
      width={containerWidth}
      height={newHeight}
      onLoad={() => setHidePoster(true)}
      frameBorder="0"
      marginHeight="0"
      marginWidth="0"
      className={showYoutube ? 'show' : ''}
    />
  );

  return (
    <YoutubePlayerStyle ref={videoContainer}>
      <PosterImage src={posterimage || youtubePoster} />
      <FeaturedPlayButton onClick={videoClick}>
        <PlayButton />
      </FeaturedPlayButton>

      {showPlayer && iframe()}
    </YoutubePlayerStyle>
  );
};

export default YoutubePlayer;
