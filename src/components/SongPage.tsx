import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { REST_API_BASE_URL } from '../config';
import { Link } from 'react-router-dom';
import { Song } from '../types';
import { ErrorMessage, PageHeader } from './styledComponents';
import styled from '@emotion/styled';

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

    const Container = styled.div`
    display: flex;
    justify-content: center;
    max-width: 600px;
    margin: 0 auto;
    padding: ${(props) => props.theme.space[3]}px;
    font-family: ${(props) => props.theme.fonts.body};
`;

    const SongDetails = styled.div`
    display: flex;
    gap: ${(props) => props.theme.space[2]}px;
    flex-direction: column;
    padding: ${props => props.theme.space[2]}px 0;
    font-size: ${props => props.theme.fontSizes[3]}px;
`;

    const SongActions = styled.div`
    display: flex;
    gap: ${props => props.theme.space[3]}px;
    justify-content: end;
    align-items: center;
`;

    const DetailItem = styled.p`
    font-size: ${props => props.theme.fontSizes[1]}px;
    opacity: 0.7;
    margin: ${props => props.theme.space[1]}px 0;
`;

    const EditSongLink = styled(Link)`
    text-decoration: none;
    color: ${(props) => props.theme.colors.secondary}
`
    const DeleteSongButton = styled.button`
    color: ${(props) => props.theme.colors.danger};
    font-size: ${props => props.theme.fontSizes[2]}px;
    cursor: pointer;
    background: none;
    border: none;
    `

    return (
        <Container>
            {
                loading && <img src="/loading.gif" alt="" height={400} width={400} />
            }
            {
                error && <ErrorMessage>Error: {error}</ErrorMessage>
            }
            {
                song && !loading && !error &&
                <div>
                    <PageHeader>{song.title}</PageHeader>
                    <SongDetails>
                        <p><DetailItem>Artist:</DetailItem> {song.artist}</p>
                        <p><DetailItem>Album:</DetailItem> {song.album}</p>
                        <p><DetailItem>Genre:</DetailItem> {song.genre}</p>
                    </SongDetails>
                    <SongActions>
                        <EditSongLink to={`/song/${song._id}/edit`}>Edit</EditSongLink>
                        <DeleteSongButton onClick={handleDeleteSong}>Delete</DeleteSongButton>
                    </SongActions>
                </div>
            }
        </Container>
    );
};

export default SongPage;
