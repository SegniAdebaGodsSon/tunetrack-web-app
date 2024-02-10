import React from 'react';
import { useParams } from 'react-router-dom';

const EditSongPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h1>Edit Song</h1>
            <p>Edit song with ID: {id}</p>
        </div>
    );
};

export default EditSongPage;
