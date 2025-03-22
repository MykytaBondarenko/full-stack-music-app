import './Artists.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Artist() {
    const [artistsData, setArtistsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {
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
    }, []);

    if (loading) return (<div>Loading...</div>);
    if (error) return (<div>Error: {error}</div>);

    const artistsList = artistsData.map(artist => <li>Artist: {artist.name}
                                                        <ul>
                                                            <li>Monthly listeners: {artist.monthly_listeners.toLocaleString()}</li>
                                                            <li>Genre: {artist.genre}</li>
                                                        </ul>
                                                    </li>);

    return (
        <div>
            <h3>Artist:</h3>
            <ul>{artistsList}</ul>
        </div>
    );
}