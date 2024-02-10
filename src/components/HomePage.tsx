import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongsFailure, fetchSongsRequest, fetchSongsSuccess } from '../store/actions/songsActions';
import { RootState } from '../store/store';
import SearchBar from './common/SearchBar';
import { Song } from '../types';
import Pagination from './common/Pagination';

const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    const { query, genre, page, pageSize, totalCount, songs, loading, error } = useSelector((state: RootState) => state.songs);

    useEffect(() => {
        dispatch(fetchSongsRequest({ query: '', genre: '', page: 1, pageSize: 10 }));

        setTimeout(() => {
            const dummySongs: Song[] = generateDummySongs(40);
            dispatch(fetchSongsSuccess({ songs: dummySongs, totalCount: dummySongs.length, page: 1, pageSize: 10 }));
        }, 1000);

    }, [dispatch]);

    const handlePageChange = (newPage: number) => {
        console.log({ newPage });
    };

    const onSearch = (query: string, genre: string) => {
        console.log({ query });
        console.log({ genre });
    }

    return (
        <div>
            <h1>Homepage</h1>
            <SearchBar query={query} genre={genre} onSearch={onSearch} />
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
                    <Pagination currentPage={page} totalPages={totalCount / pageSize} onPageChange={handlePageChange} />
                </div>
            }

        </div>
    );
};

export default HomePage;

const generateDummySongs = (count: number): Song[] => {
    const dummySongs: Song[] = [];
    for (let i = 0; i < count; i++) {
        dummySongs.push({
            _id: `${i}`,
            title: `Song ${i}`,
            artist: `Artist ${i}`,
            album: `Album ${i}`,
            genre: `Genre ${i}`,
        });
    }
    return dummySongs;
};