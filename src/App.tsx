import './App.css';
import video from './assets/videos/gorge.mp4';
import { useRef, useEffect } from 'react';

function AutoPlaySilentVideo(props: { video: string; className: string;}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
      if (videoRef.current) {
          videoRef.current.defaultMuted = true;
      }
  }, []);
  return (
      <video
          ref={videoRef}
          className={props.className}
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
      <AutoPlaySilentVideo video={video} className="background-video" />
      <div className="landing-content">
        <h1>Amelia Riely</h1>
        <nav className="nav-links">
          <a href="#work">Work</a>
          <a href="#exhibitions">Exhibitions</a>
          <a href="#about">About</a>
          <a href="mailto:hey@ameliariely.com">Contact</a>
        </nav>
      </div>
    </div>
  );
}

export default App;