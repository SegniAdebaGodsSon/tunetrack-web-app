import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { REST_API_BASE_URL } from '../config';
import axios from 'axios';
import { Song } from '../types';

const EditSongPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [song, setSong] = useState<Song | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [genre, setGenre] = useState('');

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${REST_API_BASE_URL}/api/v1/songs/${song?._id}`, { title, artist, album, genre });
            if (response.data.error) {
                setError(response.data.error)
            } else {
                const newSongId = response.data.song._id;
                navigate(`/song/${newSongId}`);
                console.log('Song created:', response.data);
            }
        } catch (error) {
            console.error('Error creating song:', error);
            setError('Failed to create song.');
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
            <h1>Edit Song</h1>
            {error && <div>Error: {error}</div>}
            {
                song &&
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input type="text" value={song.title} onChange={e => setTitle(e.target.value)} required />
                    </div>
                    <div>
                        <label>Artist:</label>
                        <input type="text" value={song.title} onChange={e => setArtist(e.target.value)} required />
                    </div>
                    <div>
                        <label>Album:</label>
                        <input type="text" value={song.album} onChange={e => setAlbum(e.target.value)} required />
                    </div>
                    <div>
                        <label>Genre:</label>
                        <input type="text" value={song.album} onChange={e => setGenre(e.target.value)} required />
                    </div>
                    <button type="submit">Update</button>
                </form>
            }
        </div>
    );
};

export default EditSongPage;
