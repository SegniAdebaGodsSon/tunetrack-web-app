import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { REST_API_BASE_URL } from '../config';
import { Link } from 'react-router-dom';
import { Song } from '../types';

const SongPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [song, setSong] = useState<Song | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSong = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${REST_API_BASE_URL}/api/v1/songs/${id}`);
                if (response.data.error) {
                    if (response.data.error === 'Invalid ID') {
                        setError('Invalid song ID');
                    } else if (response.data.error === 'Song not found') {
                        setError('Song not found');
                    } else {
                        setError('Failed to fetch song details.');
                    }
                } else {
                    // Set song data if no error
                    setSong(response.data.song);
                }
            } catch (error) {
                setError('Failed to fetch song details.');
            } finally {
                setLoading(false);
            }
        };

        fetchSong();
    }, [id]);

    const handleDeleteSong = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault(); // Prevent the default button behavior

        try {
            const response = await axios.delete(`${REST_API_BASE_URL}/api/v1/songs/${id}`);
            if (response.data.error) {
                if (response.data.error === 'Invalid ID') {
                    setError('Invalid song ID');
                } else if (response.data.error === 'Song not found') {
                    setError('Song not found');
                } else {
                    setError('Failed to delete song');
                }
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Error deleting song:', error);
            setError('Failed to delete song.');
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!song) {
        return <div>No song found.</div>;
    }

    return (
        <div>
            <div>
                <h1>Song Details</h1>
                <p>Title: {song.title}</p>
                <p>Artist: {song.artist}</p>
                <p>Album: {song.album}</p>
                <p>Genre: {song.genre}</p>
            </div>
            <div>
                <Link to={`/song/${song._id}/edit`}>Edit Song</Link>
                <button onClick={handleDeleteSong}>Delete song</button>
            </div>
        </div>
    );
};

export default SongPage;
