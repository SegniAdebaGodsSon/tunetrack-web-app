import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure } from '../actions/songsActions';
import { REST_API_BASE_URL } from '../../config';

function* fetchSongs(action: ReturnType<typeof fetchSongsRequest>) {
    try {
        const { data } = yield call(axios.get, `${REST_API_BASE_URL}/api/v1/songs`, { params: action.payload });
        yield put(fetchSongsSuccess(data));
    } catch (error: any) {
        yield put(fetchSongsFailure(error.message || "Error occured while trying to fetch data"));
    }
}

export function* watchFetchSongs() {
    yield takeEvery(fetchSongsRequest.type, fetchSongs);
}
