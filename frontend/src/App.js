import './App.css';
import Song from './components/Songs/Songs.js';
import Album from './components/Albums/Albums.js';
import Artist from './components/Artists/Artists.js';
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
