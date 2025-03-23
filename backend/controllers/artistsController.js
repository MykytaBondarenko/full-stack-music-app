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
        "SELECT * FROM Artists WHERE name='" + name + "'",
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

    console.log("INSERT INTO Artists (id, name, monthly_listeners, genre, songs, albums) VALUES (null,'" + name + "'," + monthly_listeners + ",'" + genre + "','" + songs + "','" + albums + "')");
    db.query(
        "INSERT INTO Artists (id, name, monthly_listeners, genre, songs, albums) VALUES (null,'" + name + "'," + monthly_listeners + ",'" + genre + "','" + songs + "','" + albums + "')",
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
    res.status(200).send("Put Artist");
}

exports.deleteArtistData = (req, res) => {
    res.status(200).send("Delete Artist");
}