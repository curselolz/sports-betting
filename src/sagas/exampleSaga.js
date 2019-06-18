import { put, putResolve, select, takeLatest } from 'redux-saga/effects';
import { example, exampleDone, exampleFail, exampleStart } from '../actions/exampleActions';


// ignore eslint only in example
// eslint-disable-next-line no-unused-vars
function* onExampleAction(payload) {
    try {
        yield putResolve(exampleStart());
        // eslint-disable-next-line no-unused-vars
        const store = yield select(state => state);

        yield put(exampleDone({ example: true }));
    } catch (error) {
        yield put(exampleFail({ error }));
    }
}


export default [
    takeLatest(example, onExampleAction),
];
