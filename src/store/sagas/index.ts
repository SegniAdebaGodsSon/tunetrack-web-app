import { all } from 'redux-saga/effects';
import { watchFetchSongs } from './songsSaga';

function* rootSaga() {
    yield all([
        watchFetchSongs(),
    ]);
}

export default rootSaga;
