import React from 'react';
import Youtube from './Youtube';
import Vimeo from './Vimeo';
<<<<<<< HEAD
import Vidyard from './Vidyard';
import Wistia from './Wistia';
import ModalVideo from './ModalVideo';

const getVideoPlayer = props => {
  const players = {};
  players.youtube = Youtube(props);
  players.vimeo = Vimeo(props);
  players.wistia = Wistia(props);
  players.vidyard = Vidyard(props);
=======
//import Vidyard from './Vidyard';
import Wistia from './Wistia';
import ModalVideo from './ModalVideo';
import {videoConfig} from './videoConfig';

const getVideoPlayer = props => {
  const players = {};
  players['youtube'] = Youtube(props);
  players['vimeo'] = Vimeo(props);
  players['wistia'] = Wistia(props);
  //players['vidyard'] = Vidyard(props);
>>>>>>> b6543b4d3a9836ba9ff18d80657a5ac789bf8375

  return players[props.videoplatform];
};

function Video(props) {
<<<<<<< HEAD
  const { displaytype, videoid, videoplatform } = props;
  
  if (!videoplatform.length) {
    return <div>Video platform missing.</div>;
  } else if (!videoid) {
    return <div>Video id missing.</div>;
  } else {
    if (displaytype === 'modal') {
      return <ModalVideo props={props}>{getVideoPlayer(props)}</ModalVideo>;
    } else {
=======

  const { displaytype, videoid, videoplatform } = props;
  const {modalsize} = videoConfig;
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
>>>>>>> b6543b4d3a9836ba9ff18d80657a5ac789bf8375
      return getVideoPlayer(props);
    }
  }
}

export default Video;
