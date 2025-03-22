const express = require('express');
const server = express.Router();
const songsController = require('../controllers/songsController');

server.get("/songs", songsController.getAllSongsData);
server.get("/songs/:songTitle", songsController.getSongData);
server.post("/songs/", songsController.createSongData);
server.put("/songs", songsController.updateSongData);
server.delete("/songs", songsController.deleteSongData);

module.exports = server;