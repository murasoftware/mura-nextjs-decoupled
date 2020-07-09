import React from 'react';


function Youtube(props) {
  const { instanceid, videoid } = props;
  // z5DqB0cv8uw
  return (
    <div className="youtubeWrapper" id={`player-${instanceid}`}>
      <iframe
        title="Youtube Player"
        width="1920"
        height="1080"
        src={`//www.youtube.com/embed/${videoid}?rel=0&autoplay=1&vq=hd1080&controls=0`}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Youtube;