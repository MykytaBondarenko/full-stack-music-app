import './Albums.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Albums() {
    const [albumsData, setAlbumsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {
        fetchAllAlbums();
    }, []);

    function fetchAllAlbums() {
        axios
            .get("http://localhost:5000/albums")
            .then((response) => {
                setAlbumsData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }

    function fetchAlbum(albumName) {
        axios
            .get("http://localhost:5000/albums/" + albumName)
            .then((response) => {
                setAlbumsData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }

    function createAlbum() {
        const title = prompt('Enter the title of your album: ');
        if (!title) return;
        const artist_id = prompt('Enter the artist_id of ' + title + ': ');
        if (!artist_id) return;
        const album_release_year = prompt('Enter the release year of ' + title + ': ');
        if (!album_release_year) return;
        const listens = prompt('Enter number of listens of ' + title + ': ');
        if (!listens) return;
        const songs = prompt('Enter songs in ' + title + ': (in JSON format)', "{\"songs\":[\"song1\",\"song2\",\"song3\"]}");
        if (!songs) return;

        axios
            .post("http://localhost:5000/albums", {
                album_title: title,
                artist_id: artist_id,
                album_release_year: album_release_year,
                listens: listens,
                songs: songs
            })
            .then((response) => {
                console.log(response);
                fetchAllAlbums();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function updateAlbum(album) {
        const title = prompt('Enter the title of a new album: ', album.album_title);
        if (!title) return;
        const artist_id = prompt('Enter the new artist_id of ' + title + ': ', album.artist_id);
        if (!artist_id) return;
        const album_release_year = prompt('Enter the new release year of ' + title + ': ', album.album_release_year);
        if (!album_release_year) return;
        const listens = prompt('Enter new number of listens of ' + title + ': ', album.listens);
        if (!listens) return;
        const songs = prompt('Enter new songs in ' + title + ': (in JSON format)', album.songs);
        if (!songs) return;

        axios
            .put("http://localhost:5000/albums", {
                id: album.id,
                album_title: title,
                artist_id: artist_id,
                album_release_year: album_release_year,
                listens: listens,
                songs: songs
            })
            .then((response) => {
                console.log(response);
                fetchAllAlbums();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function deleteAlbum(albumID) {
        axios
            .delete('http://localhost:5000/albums/' + albumID)
            .then((response) => {
                console.log(response);
                fetchAllAlbums();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    if (loading) return (<div>Loading...</div>);
    if (error) return (<div>Error: {error}</div>);

    let albumsList;
    if (albumsData.length < 1) albumsList = "Couldn't find the album";
    else albumsList = albumsData.map(album => <li>Album: {album.album_title}
                                                        <ul>
                                                            <li>Artist_id: {album.artist_id}</li>
                                                            <li>Release year: {album.album_release_year}</li>
                                                            <li>Listens: {album.listens}</li>
                                                        </ul>
                                                        <button onClick={() => updateAlbum(album)}>Update</button>
                                                        <button onClick={() => deleteAlbum(album.id)}>Delete</button>
                                                    </li>);

    return (
        <div>
            <input type='text' id='albumTitle'></input>
            <button onClick={() => fetchAlbum(document.getElementById('albumTitle').value)}>Search album</button>
            <button onClick={() => createAlbum()}>Create a new album</button>
            <h3>Albums:</h3>
            <ul>{albumsList}</ul>
        </div>
    );
}