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
                if (rows.length == 0) {
                    console.log("Couldn't find this artist :(")
                    res.send("Couldn't find this artist :(")
                } else {
                    console.log(rows);
                    res.send(rows);
                }
            }
    });
}

exports.createArtistData = (req, res) => {
    res.status(201).send("Post Artist");
}

exports.updateArtistData = (req, res) => {
    res.status(200).send("Put Artist");
}

exports.deleteArtistData = (req, res) => {
    res.status(200).send("Delete Artist");
}