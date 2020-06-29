import MuraDecorator from '../MuraDecorator';
import Youtube from './Youtube'


const getVideoPlayer = props => {
  const players = {};
  players['youtube'] = Youtube(props);
  return players[props.videoplatform];
};

function Video(props) {
  const { instanceid, videoid, videoplatform } = props;
  return getVideoPlayer(props);
}

export default Video;

