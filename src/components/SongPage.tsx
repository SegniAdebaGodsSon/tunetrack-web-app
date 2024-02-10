import React from 'react';
import { useParams } from 'react-router-dom';

const SongPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h1>Song Page</h1>
            <p>This is the song with ID: {id}</p>
        </div>
    );
};

export default SongPage;
