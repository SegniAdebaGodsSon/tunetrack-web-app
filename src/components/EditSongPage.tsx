import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { REST_API_BASE_URL } from '../config';
import axios from 'axios';
import { Song } from '../types';
import { ErrorMessage, Form, FormGroup, Input, Label, PageHeader, PrimaryButton } from './styledComponents';
import styled from '@emotion/styled';

const EditSongPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [song, setSong] = useState<Song | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const titleRef = useRef<HTMLInputElement | null>(null)
    const artistRef = useRef<HTMLInputElement | null>(null)
    const albumRef = useRef<HTMLInputElement | null>(null)
    const genreRef = useRef<HTMLInputElement | null>(null)

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
            if (!song) {
                setError('Failed to fetch song details.');
                return
            }

            const body = { title: titleRef.current?.value, artist: artistRef.current?.value, album: albumRef.current?.value, genre: genreRef.current?.value }

            console.log(body);
            const response = await axios.patch(`${REST_API_BASE_URL}/api/v1/songs/${song?._id}`, body);

            if (response.data.error) {
                setError(response.data.error)
            } else {
                const newSongId = response.data.song._id;
                navigate(`/song/${newSongId}`);
                console.log('Song updated:', response.data);
            }
        } catch (error) {
            console.error('Error updating song:', error);
            setError('Failed to updating song.');
        }
    };

    const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${(props) => props.theme.space[3]}px;
    max-width: 350px;
    margin: 0 auto;
    padding: ${(props) => props.theme.space[3]}px;
    font-family: ${(props) => props.theme.fonts.body};
`;

    return (
        <div>
            <Container>
                <PageHeader>Edit Song</PageHeader>
                {
                    loading && <img src="/loading.gif" alt="" height={400} width={400} />
                }
                {
                    error && <ErrorMessage>Error: {error}</ErrorMessage>
                }
                {
                    song && !loading && !error &&
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label>Title:</Label>
                            <Input ref={titleRef} type="text" name="title" defaultValue={song.title} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Artist:</Label>
                            <Input ref={artistRef} type="text" name="artist" defaultValue={song.artist} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Album:</Label>
                            <Input ref={albumRef} type="text" name="album" defaultValue={song.album} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Genre:</Label>
                            <Input ref={genreRef} type="text" name="genre" defaultValue={song.genre} required />
                        </FormGroup>
                        <PrimaryButton type="submit">Update</PrimaryButton>
                    </Form>
                }
            </Container>
        </div>
    );
};

export default EditSongPage;
