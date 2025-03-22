import './App.css';
import Songs from './components/Songs/Songs.js';
import Albums from './components/Albums/Albums.js';
import Artists from './components/Artists/Artists.js';
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
  let CurrentPage;
  switch (window.location.pathname) {
    case '/':
      CurrentPage = Home;
      break;
    case '/artists':
      CurrentPage = Artists;
      break;
    case '/albums':
      CurrentPage = Albums;
      break;
    case '/songs':
      CurrentPage = Songs;
      break;
  }

  return (
    <div className="App">
      <NavBar></NavBar>
      <CurrentPage></CurrentPage>
    </div>
  );
}

export default App;
