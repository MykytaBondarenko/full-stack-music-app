import './Songs.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Songs() {
    const [songsData, setSongsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [artistsData, setArtistsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);

    useEffect( () => {
        fetchAllSongs();
        fetchAllArtists();
        fetchAllAlbums();
    }, []);

    function fetchAllSongs() {
        axios
            .get("http://localhost:5000/songs")
            .then((response) => {
                setSongsData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }

    function fetchSong(songTitle) {
        axios
            .get("http://localhost:5000/songs/" + songTitle)
            .then((response) => {
                setSongsData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }

    function createSong() {
        let availableAlbumsIDs = "";
        for (let i = 0; i < albumsData.length; i++) {
            availableAlbumsIDs += (albumsData[i].album_title + ": " + albumsData[i].id + ", ");
        }
        availableAlbumsIDs = availableAlbumsIDs.substring(0, availableAlbumsIDs.length - 2);

        const title = prompt('Enter the title of your song: ');
        if (!title) return;
        const song_release_year = prompt('Enter the release year of ' + title + ': ');
        if (!song_release_year) return;
        const album_id = prompt('Enter the album_id of ' + title + ': (available albums IDs are ' + availableAlbumsIDs + ')');
        if (!album_id) return;
        const artist_id = findArtistIDByAlbumID(album_id);
        console.log(artist_id);
        if (!artist_id) return;

        axios
            .post("http://localhost:5000/songs", {
                song_title: title,
                song_release_year: song_release_year,
                album_id: album_id,
                artist_id: artist_id
            })
            .then((response) => {
                console.log(response);
                fetchAllSongs();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function updateSong(song) {
        const title = prompt('Enter the title of a new song: ', song.song_title);
        if (!title) return;
        const song_release_year = prompt('Enter the new release year of ' + title + ': ', song.song_release_year);
        if (!song_release_year) return;
        const album_id = prompt('Enter the new album_id of ' + title + ': ', song.album_id);
        if (!album_id) return;
        const artist_id = prompt('Enter new artist_id of ' + title + ': ', song.artist_id);
        if (!artist_id) return;

        axios
            .put("http://localhost:5000/songs", {
                id: song.id,
                song_title: title,
                song_release_year: song_release_year,
                album_id: album_id,
                artist_id: artist_id
            })
            .then((response) => {
                console.log(response);
                fetchAllSongs();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function deleteSong(songID) {
        axios
            .delete('http://localhost:5000/songs/' + songID)
            .then((response) => {
                console.log(response);
                fetchAllSongs();
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

    function findArtistNameByData(artistID) {
        for (let i = 0; i < artistsData.length; i++) {
            if (artistsData[i].id == artistID) {
                return artistsData[i].name;
            }
        }
        return "Unknown artist";
    }

    function findAlbumTitleByData(albumID) {
        for (let i = 0; i < albumsData.length; i++) {
            if (albumsData[i].id == albumID) {
                return albumsData[i].album_title;
            }
        }
        return "Unknown album";
    }

    function findArtistIDByAlbumID(albumID) {
        let artistID;
        for (let i = 0; i < albumsData.length; i++) {
            if (albumsData[i].id == albumID) {
                return albumsData[i].artist_id;
            }
        }
        return -1;
    }

    if (loading) return (<div>Loading...</div>);
    if (error) return (<div>Error: {error}</div>);

    let songsList;
    if (songsData.length < 1) songsList = "Couldn't find the song";
    else songsList = songsData.map(song => <li class="songBox">{song.song_title}
                                                        <p>Release year: {song.song_release_year}</p>
                                                        <p>Album: {findAlbumTitleByData(song.album_id)}</p>
                                                        <p>Artist: {findArtistNameByData(song.artist_id)}</p>
                                                        <button onClick={() => updateSong(song)}>Update</button>
                                                        <button onClick={() => deleteSong(song.id)}>Delete</button>
                                                    </li>);

    return (
        <div>
            <h1>Songs:</h1>
            <div id="inputDiv">
                <div>
                    <input type='text' id='songTitle' placeholder="Song's Title" class="findSong"></input>
                    <button onClick={() => fetchSong(document.getElementById('songTitle').value)} class="findSong">Search song</button>
                </div>
                <div>
                    <button onClick={() => createSong()} class="createSong">Add a new song</button>
                </div>
            </div>
            <ul id="songsUL">{songsList}</ul>
        </div>
    );
}