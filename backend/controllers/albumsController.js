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
        "SELECT * FROM Albums WHERE album_title=\"" + title + "\"",
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

exports.createAlbumData = (req, res) => {
    const data = req.body;
    const title = data.album_title;
    const artist_id = data.artist_id;
    const album_release_year = data.album_release_year;
    const listens = data.listens;
    const songs = data.songs;

    console.log("INSERT INTO Albums (id, album_title, artist_id, album_release_year, listens, songs) VALUES (null,\"" + title + "\"," + artist_id + "," + album_release_year + "," + listens + ",'" + songs + "')");
    db.query(
        "INSERT INTO Albums (id, album_title, artist_id, album_release_year, listens, songs) VALUES (null,\"" + title + "\"," + artist_id + "," + album_release_year + "," + listens + ",'" + songs + "')",
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

exports.updateAlbumData = (req, res) => {
    const data = req.body;
    const id = data.id;
    const title = data.album_title;
    const artist_id = data.artist_id;
    const album_release_year = data.album_release_year;
    const listens = data.listens;
    const songs = data.songs;

    console.log("UPDATE Albums SET id=" + id + ",album_title=\"" + title + "\",artist_id=" + artist_id + ",album_release_year=" + album_release_year + ",listens=" + listens + ",songs='" + songs + "' WHERE id=" + id);
    db.query(
        "UPDATE Albums SET id=" + id + ",album_title=\"" + title + "\",artist_id=" + artist_id + ",album_release_year=" + album_release_year + ",listens=" + listens + ",songs='" + songs + "' WHERE id=" + id,
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

exports.deleteAlbumData = (req, res) => {
    const id = req.params.albumID;

    console.log("DELETE Songs FROM Songs INNER JOIN Albums ON Albums.id=Songs.album_id WHERE Albums.id=" + id);
    console.log("DELETE FROM Albums WHERE Albums.id=" + id);
    db.query(
        "DELETE Songs FROM Songs INNER JOIN Albums ON Albums.id=Songs.album_id WHERE Albums.id=" + id,
        function (error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(result);
            }
    });
    db.query(
        "DELETE FROM Albums WHERE Albums.id=" + id,
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