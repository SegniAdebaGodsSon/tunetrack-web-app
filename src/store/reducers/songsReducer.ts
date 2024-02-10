import { createReducer } from '@reduxjs/toolkit';
import { SongsState } from '../../types';
import { fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure } from '../actions/songsActions';

const initialState: SongsState = {
    search: '',
    genre: '',
    page: 1,
    pageSize: 10,
    totalCount: 0,
    songs: [],
    loading: false,
    error: null,
};

const songsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchSongsRequest, (state, action) => {
            state.loading = true;
            state.error = null;
            state.search = action.payload.search
            state.genre = action.payload.genre
            state.page = action.payload.page;
            state.pageSize = action.payload.pageSize;
        })
        .addCase(fetchSongsSuccess, (state, action) => {
            state.songs = action.payload.songs;
            state.totalCount = action.payload.totalCount;
            state.page = action.payload.page;
            state.pageSize = action.payload.pageSize;
            state.loading = false;
        })
        .addCase(fetchSongsFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
});

export default songsReducer;
