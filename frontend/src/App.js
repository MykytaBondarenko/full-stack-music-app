import './App.css';
import Song from './components/Song.js';
import Album from './components/Album.js';

const songs = [
  'Next To Me',
  'I Dont Know Why',
  'Whatever It Takes',
  'Believer',
  'Walking the Wire',
  'Rise Up'
];

const songsList = songs.map(songTitle => <li>{songTitle}</li>)

function App() {
  return (
    <div className="App">
      <h1>Music App</h1>
      <Song title={'Test'} />
      <Album title={'Evolve'} songsList={songsList}></Album>
    </div>
  );
}

export default App;
