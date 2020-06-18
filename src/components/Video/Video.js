import MuraDecorator from '../MuraDecorator';
import Youtube from './Youtube'


const getVideoPlayer = props => {
  const players = {};
  players['youtube'] = Youtube(props);
  return players[props.videoplatform];
};

function Video(props) {
  const { instanceid, videoid, videoplatform } = props;
  return (
    <MuraDecorator {...props}>
      <div className="mura-object-content">{getVideoPlayer(props)}</div>
    </MuraDecorator>
  );
}

export default Video;

