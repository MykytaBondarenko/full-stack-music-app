const express = require('express');
const server = express.Router();
const albumsController = require('../controllers/albumsController');

server.get("/albums", albumsController.getAllAlbumsData);
server.get("/albums/:albumTitle", albumsController.getAlbumData);
server.post("/albums/", albumsController.createAlbumData);
server.put("/albums", albumsController.updateAlbumData);
server.delete("/albums", albumsController.deleteAlbumData);

module.exports = server;