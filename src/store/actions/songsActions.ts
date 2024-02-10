import { createAction } from '@reduxjs/toolkit';
import { Song } from '../../types';

interface FetchSongsPayload {
    page: number;
    pageSize: number;
    query: string;
    genre: string;
}

interface FetchSongsSuccessPayload {
    songs: Song[];
    totalCount: number;
    page: number;
    pageSize: number;
}

export const fetchSongsRequest = createAction<FetchSongsPayload>('songs/fetchSongsRequest');
export const fetchSongsSuccess = createAction<FetchSongsSuccessPayload>('songs/fetchSongsSuccess');
export const fetchSongsFailure = createAction<string>('songs/fetchSongsFailure');
