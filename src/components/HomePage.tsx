import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongsRequest } from '../store/actions/songsActions';
import { RootState } from '../store/store';
import SearchBar from './common/SearchBar';
import Pagination from './common/Pagination';
import { ErrorMessage } from './styledComponents';
import SongCard from './SongCard';
import styled from '@emotion/styled';

const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    const { search, genre, page, pageSize, totalCount, songs, loading, error } = useSelector((state: RootState) => state.songs);

    useEffect(() => {
        dispatch(fetchSongsRequest({ search: '', genre: '', page: 1, pageSize: 10 }));
    }, [dispatch]);

    const handlePageChange = (newPage: number) => {
        dispatch(fetchSongsRequest({ search, genre, page: newPage, pageSize: 10 }));
    };

    const onSearch = (search: string, genre: string) => {
        dispatch(fetchSongsRequest({ search, genre, page: 1, pageSize: 10 }));
    }

    const CardListContainer = styled.div`
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        `;

    return (
        <div>

            <SearchBar search={search} genre={genre} onSearch={onSearch} />

            <CardListContainer>
                {
                    loading && <img src="/loading.gif" alt="" height={400} width={400} />
                }
                {
                    error && <ErrorMessage>Error: {error}</ErrorMessage>
                }

                {songs && !loading && !error && songs.map(song => (
                    <SongCard key={song._id} song={song} />
                ))}

            </CardListContainer>

            {songs && !loading && !error &&
                <Pagination currentPage={page} totalPages={Math.ceil(totalCount / pageSize)} onPageChange={handlePageChange} />
            }

        </div>
    );
};

export default HomePage;