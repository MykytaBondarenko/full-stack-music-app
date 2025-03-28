// Packages
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Routers
const artistsRouter = require('./routers/artistsRouter');
const albumsRouter = require('./routers/albumsRouter');
const songsRouter = require('./routers/songsRouter');

const server = express();
server.use(cors());
server.use(bodyParser.json());
const PORT = 5000;

server.use(artistsRouter);
server.use(albumsRouter);
server.use(songsRouter);

server.listen(PORT, () => {
    console.log('Server running http://localhost:' + PORT);
});