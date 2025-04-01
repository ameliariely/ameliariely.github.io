import './App.css';
import video from './assets/videos/gorge.mp4';

function App() {
  return (
    <div className="App">
      <video autoPlay loop muted className="background-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h1>Amelia Riely</h1>
    </div>
  );
}

export default App;