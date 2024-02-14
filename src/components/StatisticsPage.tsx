import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ErrorMessage, PageHeader } from './styledComponents';
import styled from '@emotion/styled';
import { REST_API_BASE_URL } from '../config';
import SingleStatsCard from './stats/SingleStatsCard';
import MultipleStatsCard from './stats/MultipleStatsCard';

export interface Statistic {
    _id: string;
    count: number;
}

interface StatisticsPageProps {
    totalSongs: number;
    totalArtists: number;
    totalAlbums: number;
    totalGenres: number;
    songsInGenres: Statistic[];
    songsPerArtist: Statistic[];
    songsPerAlbum: Statistic[];
}

const StatisticsPage: React.FC = () => {
    const [statistics, setStatistics] = useState<StatisticsPageProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get(`${REST_API_BASE_URL}/api/v1/stats`);
                setStatistics(response.data);
            } catch (error) {
                setError('Failed to fetch statistics.');
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    const Container = styled.div`
    max-width: 1000px;
    padding: ${props => props.theme.space[3]}px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: start;
    gap: ${props => props.theme.space[3]}px;
    margin: 0 auto;
`;

    const RowContainer = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        gap: ${props => props.theme.space[3]}px;
    `;

    const LoadingImage = styled.img`
    `;

    return (
        <div>
            <Container>
                <PageHeader>Stats</PageHeader>
            </Container>
            <Container>
                {loading && <LoadingImage src="/loading.gif" alt="Loading" height={400} width={400} />}
                {error && <ErrorMessage>Error: {error}</ErrorMessage>}
            </Container>
            {statistics && !loading && !error && (
                <>
                    <RowContainer>
                        <SingleStatsCard title='Total Artists' value={statistics.totalArtists} icon='./artist.png' />
                        <SingleStatsCard title='Total Albums' value={statistics.totalAlbums} icon='./album.png' />
                        <SingleStatsCard title='Total Genres' value={statistics.totalGenres} icon='./genre.png' />
                    </RowContainer>
                    <Container>
                        <MultipleStatsCard name='Songs in Genres' stats={statistics.songsInGenres} />
                        <MultipleStatsCard name='Songs per Artist' stats={statistics.songsPerArtist} />
                        <MultipleStatsCard name='Songs per Album' stats={statistics.songsPerAlbum} />
                    </Container>
                </>
            )}
        </div>
    );
};

export default StatisticsPage;
