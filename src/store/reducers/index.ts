import { combineReducers } from '@reduxjs/toolkit';
import songsReducer from './songsReducer';

const rootReducer = combineReducers({
    songs: songsReducer,
});

export default rootReducer;
