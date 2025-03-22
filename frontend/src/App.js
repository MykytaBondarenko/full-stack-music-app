import './App.css';
import Song from './components/Song/Song.js';
import Album from './components/Album/Album.js';
import Artist from './components/Artist/Artist.js';
import Home from './components/Home/Home.js';
import NavBar from './components/NavBar/NavBar.js';

/*const songs = [
  'Next To Me',
  'I Dont Know Why',
  'Whatever It Takes',
  'Believer',
  'Walking the Wire',
  'Rise Up'
];

const songsList = songs.map(songTitle => <li>{songTitle}</li>)*/

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Home></Home>
    </div>
  );
}

export default App;
