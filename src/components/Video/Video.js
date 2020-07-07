import Youtube from './Youtube';

const getVideoPlayer = props => {
  const players = {};
  players.youtube = Youtube(props);
  return players[props.videoplatform];
};

function Video(props) {
  return getVideoPlayer(props);
}

export default Video;
