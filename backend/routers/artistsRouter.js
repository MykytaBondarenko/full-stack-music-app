const express = require('express');
const server = express.Router();
const cors = require('cors');
server.use(cors());
const artistsController = require('../controllers/artistsController');

server.get("/artists", artistsController.getAllArtistsData);
server.get("/artists/:artistName", artistsController.getArtistData);
server.post("/artists/", artistsController.createArtistData);
server.put("/artists", artistsController.updateArtistData);
server.delete("/artists", artistsController.deleteArtistData);

module.exports = server;