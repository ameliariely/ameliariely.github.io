import './App.css';
import video from './assets/videos/gorge.mp4';
import React, { useRef, useEffect } from 'react';

function AutoPlaySilentVideo(props: { video: string; }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
      if (videoRef.current) {
          videoRef.current.defaultMuted = true;
      }
  }, []);
  return (
      <video
          ref={videoRef}
          loop
          autoPlay
          muted
          playsInline>
          <source src={props.video} type="video/mp4"/>
      </video>
  );
}

function App() {
  return (
    <div className="App">
      <AutoPlaySilentVideo video={video} />
      <h1>Amelia Riely</h1>
    </div>
  );
}

export default App;