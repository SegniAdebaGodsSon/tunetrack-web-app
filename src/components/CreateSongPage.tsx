import React, { useState } from 'react';
import axios from 'axios';
import { REST_API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const CreateSongPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [genre, setGenre] = useState('');
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${REST_API_BASE_URL}/api/v1/songs`, { title, artist, album, genre });
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

    return (
        <div>
            <h1>Create Song</h1>
            {error && <div>Error: {error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Artist:</label>
                    <input type="text" value={artist} onChange={e => setArtist(e.target.value)} required />
                </div>
                <div>
                    <label>Album:</label>
                    <input type="text" value={album} onChange={e => setAlbum(e.target.value)} required />
                </div>
                <div>
                    <label>Genre:</label>
                    <input type="text" value={genre} onChange={e => setGenre(e.target.value)} required />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateSongPage;
