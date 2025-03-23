import './Artists.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Artists() {
    const [artistsData, setArtistsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {
        fetchAllArtists();
    }, []);

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

    function fetchArtist(artistName) {
        axios
            .get("http://localhost:5000/artists/" + artistName)
            .then((response) => {
                setArtistsData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }

    function createArtist() {
        const name = prompt('Enter the name of your artist: ');
        const monthly_listeners = prompt('Enter number of monthly listeners of ' + name + ': ');
        const genre = prompt('Enter genre of ' + name + ': ');
        const songs = prompt('Enter songs of ' + name + ': (in JSON format)');
        const albums = prompt('Enter albums of ' + name + ': (in JSON format)');

        axios
            .post("http://localhost:5000/artists", {
                name: name,
                monthly_listeners: monthly_listeners,
                genre: genre,
                songs: songs,
                albums: albums
            })
            .then((response) => {
                console.log(response);
                fetchAllArtists();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    if (loading) return (<div>Loading...</div>);
    if (error) return (<div>Error: {error}</div>);

    let artistsList;
    if (artistsData.length < 1) artistsList = "Couldn't find the artist";
    else artistsList = artistsData.map(artist => <li>Artist: {artist.name}
                                                        <ul>
                                                            <li>Monthly listeners: {artist.monthly_listeners.toLocaleString()}</li>
                                                            <li>Genre: {artist.genre}</li>
                                                        </ul>
                                                        <button>Update</button>
                                                        <button>Delete</button>
                                                    </li>);

    return (
        <div>
            <input type='text' id='artistName'></input>
            <button onClick={() => fetchArtist(document.getElementById('artistName').value)}>Search artist</button>
            <button onClick={() => createArtist()}>Create a new artist</button>
            <h3>Artists:</h3>
            <ul>{artistsList}</ul>
        </div>
    );
}