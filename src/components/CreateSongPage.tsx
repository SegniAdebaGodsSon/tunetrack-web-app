import React, { useRef, useState } from 'react';
import axios from 'axios';
import { REST_API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Input, Label, PageHeader, PrimaryButton } from './styledComponents';
import styled from '@emotion/styled';

const CreateSongPage: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

    const titleRef = useRef<HTMLInputElement | null>(null)
    const artistRef = useRef<HTMLInputElement | null>(null)
    const albumRef = useRef<HTMLInputElement | null>(null)
    const genreRef = useRef<HTMLInputElement | null>(null)

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const body = { title: titleRef.current?.value, artist: artistRef.current?.value, album: albumRef.current?.value, genre: genreRef.current?.value }
            const response = await axios.post(`${REST_API_BASE_URL}/api/v1/songs`, body);
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

    const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${props => props.theme.space[3]}px;
    max-width: 400px;
    margin: 0 auto;
    padding: ${props => props.theme.space[3]}px;
    font-family: ${(props) => props.theme.fonts.body}
`;

    return (
        <Container>
            <PageHeader>Create Song</PageHeader>
            {error && <div>Error: {error}</div>}
            <Form onSubmit={handleSubmit}>
                <div>
                    <Label>Title:</Label>
                    <Input type="text" ref={titleRef} required />
                </div>
                <div>
                    <Label>Artist:</Label>
                    <Input type="text" ref={artistRef} required />
                </div>
                <div>
                    <Label>Album:</Label>
                    <Input type="text" ref={albumRef} required />
                </div>
                <FormGroup>
                    <Label>Genre:</Label>
                    <Input type="text" ref={genreRef} required />
                </FormGroup>
                <PrimaryButton type="submit">Create</PrimaryButton>
            </Form>
        </Container>
    );
};

export default CreateSongPage;
