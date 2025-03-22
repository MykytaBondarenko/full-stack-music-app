const express = require('express');
const db = require('../database');

exports.getAllSongsData = (req, res) => {
    db.query(
        "SELECT * FROM Songs",
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

exports.getSongData = (req, res) => {
    const title = req.params.songTitle;
    db.query(
        "SELECT * FROM Songs WHERE song_title='" + title + "'",
        function(error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                const rows = JSON.parse(JSON.stringify(result));
                if (rows.length == 0) {
                    console.log("Couldn't find this song :(")
                    res.send("Couldn't find this song :(")
                } else {
                    console.log(rows);
                    res.send(rows);
                }
            }
    });
}

exports.createSongData = (req, res) => {
    res.status(201).send("Post Song");
}

exports.updateSongData = (req, res) => {
    res.status(200).send("Put Song");
}

exports.deleteSongData = (req, res) => {
    res.status(200).send("Delete Song");
}