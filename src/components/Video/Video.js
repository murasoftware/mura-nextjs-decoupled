<<<<<<< HEAD
import MuraDecorator from '../MuraDecorator';
import Youtube from './Youtube';
import Vimeo from './Vimeo';
import Vidyard from './Vidyard';
import Wistia from './Wistia';
import ModalVideo from './ModalVideo';
import {videoConfig} from './videoConfig';

const getVideoPlayer = props => {
  const players = {};
  players['youtube'] = Youtube(props);
  players['vimeo'] = Vimeo(props);
  players['wistia'] = Wistia(props);
  players['vidyard'] = Vidyard(props);

=======
import Youtube from './Youtube';

const getVideoPlayer = props => {
  const players = {};
  players.youtube = Youtube(props);
>>>>>>> b9453ff824ea453040b2418f7389852cc86913c2
  return players[props.videoplatform];
};

function Video(props) {
<<<<<<< HEAD

console.log("VIDEO",props.displaytype);

  const { displaytype, videoid, videoplatform } = props;
  const {modalsize} = videoConfig;

  console.log("MSIZE",modalsize);

  if(!videoplatform.length) {
    return <div>Video platform missing.</div>
  }
  else if(!videoid) {
    return <div>Video id missing.</div>
  }
  else {
    if(displaytype === 'modal') {
      return (
      <ModalVideo props={props}>
        {getVideoPlayer(props)}
      </ModalVideo>
      )
    }
    else {
      return getVideoPlayer(props);
    }
  }
=======
  return getVideoPlayer(props);
>>>>>>> b9453ff824ea453040b2418f7389852cc86913c2
}

export default Video;
