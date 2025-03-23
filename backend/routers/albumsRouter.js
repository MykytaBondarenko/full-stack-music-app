const express = require('express');
const server = express.Router();
const albumsController = require('../controllers/albumsController');

server.get("/albums", albumsController.getAllAlbumsData);
server.get("/albums/:albumTitle", albumsController.getAlbumData);
server.get("/albums/searchByID/:albumID", albumsController.getAlbumDataByID);
server.post("/albums/", albumsController.createAlbumData);
server.put("/albums", albumsController.updateAlbumData);
server.delete("/albums/:albumID", albumsController.deleteAlbumData);

module.exports = server;