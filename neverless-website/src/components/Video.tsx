import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

interface MovieClipProps {
  videoID: string;
}

const MovieClip = ({ videoID }: MovieClipProps) => {
  const [videoOptions, setVideoOptions] = useState({
    height: '320',
    width: '500',
    playerVars: {
      autoplay: 1,
      controls: 1,
    },
  });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 800) {
        // 10% smaller
        setVideoOptions({
          height: `${320 * 0.75}`,
          width: `${500 * 0.75}`,
          playerVars: {
            autoplay: 1,
            controls: 1,
          },
        });
      } else {
        // Original size
        setVideoOptions({
          height: '320',
          width: '500',
          playerVars: {
            autoplay: 1,
            controls: 1,
          },
        });
      }
    }

    // Initial call
    handleResize();

    // Attach event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function _onReady(event: any) {
    event.target.pauseVideo();
  }

  return <YouTube videoId={videoID} opts={videoOptions} onReady={_onReady} id="video" />;
}

export default MovieClip;
