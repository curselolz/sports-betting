import { all } from 'redux-saga/effects';
import exampleSaga from '../sagas/exampleSaga';
import lobbySaga from '../sagas/lobbySaga';

export default function* rootSaga() {
    yield all([
        ...exampleSaga,
        ...lobbySaga,
    ]);
}
