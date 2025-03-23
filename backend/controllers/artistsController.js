const express = require('express');
const db = require('../database');

exports.getAllArtistsData = (req, res) => {
    db.query(
        "SELECT * FROM Artists",
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

exports.getArtistData = (req, res) => {
    const name = req.params.artistName;
    db.query(
        "SELECT * FROM Artists WHERE name=\"" + name + "\"",
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

exports.createArtistData = (req, res) => {
    const data = req.body;
    const name = data.name;
    const monthly_listeners = data.monthly_listeners;
    const genre = data.genre;
    const songs = data.songs;
    const albums = data.albums;

    console.log("INSERT INTO Artists (id, name, monthly_listeners, genre, songs, albums) VALUES (null,\"" + name + "\"," + monthly_listeners + ",\"" + genre + "\",'" + songs + "','" + albums + "')");
    db.query(
        "INSERT INTO Artists (id, name, monthly_listeners, genre, songs, albums) VALUES (null,\"" + name + "\"," + monthly_listeners + ",\"" + genre + "\",'" + songs + "','" + albums + "')",
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

exports.updateArtistData = (req, res) => {
    const data = req.body;
    const id = data.id;
    const name = data.name;
    const monthly_listeners = data.monthly_listeners;
    const genre = data.genre;
    const songs = data.songs;
    const albums = data.albums;

    console.log("UPDATE Artists SET id=" + id + ",name=\"" + name + "\",monthly_listeners=" + monthly_listeners + ",genre=\"" + genre + "\",songs='" + songs + "',albums='" + albums + "' WHERE id=" + id);
    db.query(
        "UPDATE Artists SET id=" + id + ",name=\"" + name + "\",monthly_listeners=" + monthly_listeners + ",genre=\"" + genre + "\",songs='" + songs + "',albums='" + albums + "' WHERE id=" + id,
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

exports.deleteArtistData = (req, res) => {
    const id = req.params.artistID;

    console.log("DELETE Songs FROM Songs INNER JOIN Artists ON Artists.id=Songs.artist_id WHERE Artists.id=" + id);
    console.log("DELETE Albums FROM Albums INNER JOIN Artists ON Artists.id=Albums.artist_id WHERE Artists.id=" + id);
    console.log("DELETE FROM Artists WHERE Artists.id=" + id);
    db.query(
        "DELETE Songs FROM Songs INNER JOIN Artists ON Artists.id=Songs.artist_id WHERE Artists.id=" + id,
        function (error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(result);
            }
        }
    )
    db.query(
        "DELETE Albums FROM Albums INNER JOIN Artists ON Artists.id=Albums.artist_id WHERE Artists.id=" + id,
        function (error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(result);
            }
    });
    db.query(
        "DELETE FROM Artists WHERE Artists.id=" + id,
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