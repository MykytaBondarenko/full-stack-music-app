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
        "SELECT * FROM Songs WHERE song_title REGEXP \"" + title + "\"",
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

exports.createSongData = (req, res) => {
    const data = req.body;
    const title = data.song_title;
    const song_release_year = data.song_release_year;
    const album_id = data.album_id;
    const artist_id = data.artist_id;

    console.log("INSERT INTO Songs (id, song_title, song_release_year, album_id, artist_id) VALUES (null,\"" + title + "\"," + song_release_year + "," + album_id + "," + artist_id + ")");
    db.query(
        "INSERT INTO Songs (id, song_title, song_release_year, album_id, artist_id) VALUES (null,\"" + title + "\"," + song_release_year + "," + album_id + "," + artist_id + ")",
        function(error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(result);
                res.status(201).send(result);
            }
    });
}

exports.updateSongData = (req, res) => {
    const data = req.body;
    const id = data.id;
    const title = data.song_title;
    const song_release_year = data.song_release_year;
    const album_id = data.album_id;
    const artist_id = data.artist_id;

    console.log("UPDATE Songs SET id=" + id + ",song_title=\"" + title + "\",song_release_year=" + song_release_year + ",album_id=" + album_id + ",artist_id=" + artist_id + " WHERE id=" + id);
    db.query(
        "UPDATE Songs SET id=" + id + ",song_title=\"" + title + "\",song_release_year=" + song_release_year + ",album_id=" + album_id + ",artist_id=" + artist_id + " WHERE id=" + id,
        function (error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(result);
                res.status(200).send(result);
            }
    });
}

exports.deleteSongData = (req, res) => {
    const id = req.params.songID;

    db.query(
        "DELETE FROM Songs WHERE Songs.id=" + id,
        function (error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(result);
                res.send(result);
            }
        }
    )
}