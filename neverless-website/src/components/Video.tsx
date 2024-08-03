import React from 'react';
import YouTube from 'react-youtube';

const options = {
    height: '320',
    width: '500',
    playerVars: {
      autoplay: 1,
      controls: 1,
    }
};


const MovieClip = ({videoID}) => {

    function _onReady(event: any) {
        event.target.pauseVideo();
      }

     return (<YouTube videoId={videoID} opts={options} onReady={_onReady} id="video"/>);
 }

 export default MovieClip;