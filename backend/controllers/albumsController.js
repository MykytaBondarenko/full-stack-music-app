const express = require('express');
const db = require('../database');

exports.getAllAlbumsData = (req, res) => {
    db.query(
        "SELECT * FROM Albums",
        function(error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                const rows = JSON.parse(JSON.stringify(result));
                console.log(rows);
                res.send(rows);
            }
    });
}

exports.getAlbumData = (req, res) => {
    const title = req.params.albumTitle;
    db.query(
        "SELECT * FROM Albums WHERE album_title='" + title + "'",
        function(error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                const rows = JSON.parse(JSON.stringify(result));
                if (rows.length == 0) {
                    console.log("Couldn't find this album :(")
                    res.send("Couldn't find this album :(")
                } else {
                    console.log(rows);
                    res.send(rows);
                }
            }
    });
}

exports.createAlbumData = (req, res) => {
    res.status(201).send("Post Album");
}

exports.updateAlbumData = (req, res) => {
    res.status(200).send("Put Album");
}

exports.deleteAlbumData = (req, res) => {
    res.status(200).send("Delete Album");
}