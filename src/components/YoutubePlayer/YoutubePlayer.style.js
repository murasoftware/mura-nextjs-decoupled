import styled from 'styled-components';
import theme from '@styles/theme';

export const YoutubePlayerStyle = styled.div`
  position: relative;
  width: 100%;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 500ms linear;
    &.show {
      opacity: 1;
    }
  }
`;

export const PosterImage = styled.img``;

export const FeaturedPlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  svg {
    @media (max-width: ${theme.breakpoints.mobile.max}px) {
      width: 54px;
    }
  }


`;
