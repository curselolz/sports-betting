import { call, put, putResolve, takeLatest } from 'redux-saga/effects';
import { loadEvents, loadEventsDone, loadEventsFail, loadEventsStart } from '../actions/lobbyActions';
import Api from '../utils/api';


function* onLoadEvents() {
    try {
        yield putResolve(loadEventsStart());

        // api call example
        const data = yield call([Api, Api.get], { url: 'lobby.fetchLobby' });

        yield put(loadEventsDone(data));
    } catch (error) {
        yield put(loadEventsFail({ error }));
    }
}


export default [
    takeLatest(loadEvents, onLoadEvents),
];
