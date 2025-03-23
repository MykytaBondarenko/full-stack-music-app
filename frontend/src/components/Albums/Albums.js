import './Albums.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Albums() {
    const [albumsData, setAlbumsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [artistsData, setArtistsData] = useState([]);

    useEffect( () => {
        fetchAllAlbums();
        fetchAllArtists();
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

    function fetchAllArtists() {
        axios
            .get("http://localhost:5000/artists")
            .then((response) => {
                setArtistsData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }

    function findArtistNameByData(artistID) {
        for (let i = 0; i < artistsData.length; i++) {
            if (artistsData[i].id == artistID) {
                return artistsData[i].name;
            }
        }
        return "Unknown artist";
    }

    if (loading) return (<div>Loading...</div>);
    if (error) return (<div>Error: {error}</div>);

    let albumsList;
    if (albumsData.length < 1) albumsList = "Couldn't find the album";
    else albumsList = albumsData.map(album => <li class="albumBox">{album.album_title}
                                                        <p>Artist: {findArtistNameByData(album.artist_id)}</p>
                                                        <p>Release year: {album.album_release_year}</p>
                                                        <p>Listens: {album.listens.toLocaleString()}</p>
                                                        <button onClick={() => updateAlbum(album)}>Update</button>
                                                        <button onClick={() => deleteAlbum(album.id)}>Delete</button>
                                                    </li>);

    return (
        <div>
            <h1>Albums:</h1>
            <div id="inputDiv">
                <div>
                    <input type='text' id='albumTitle' placeholder="Albums's Title" class="findAlbum"></input>
                    <button onClick={() => fetchAlbum(document.getElementById('albumTitle').value)} class="findAlbum">Search album</button>
                </div>
                <div>
                    <button onClick={() => createAlbum()} class="createAlbum">Add a new album</button>
                </div>
            </div>
            <ul id="albumsUL">{albumsList}</ul>
        </div>
    );
}