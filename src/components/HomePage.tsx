import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongsRequest } from '../store/actions/songsActions';
import { RootState } from '../store/store';
import SearchBar from './common/SearchBar';
import Pagination from './common/Pagination';

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

    return (
        <div>
            <h1>Homepage</h1>
            <SearchBar search={search} genre={genre} onSearch={onSearch} />
            {
                loading && <div>Loading...</div>
            }
            {
                error && <div>Error: {error}</div>
            }

            {
                songs &&
                <div>
                    <div>
                        <ul>
                            {songs.map(song => (
                                <li key={song._id}>{song.title} - {song.artist}</li>
                            ))}
                        </ul>
                    </div>
                    <Pagination currentPage={page} totalPages={Math.ceil(totalCount / pageSize)} onPageChange={handlePageChange} />
                </div>
            }

        </div>
    );
};

export default HomePage;