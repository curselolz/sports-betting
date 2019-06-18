import {
    applyMiddleware,
    compose,
    createStore,
} from 'redux';
import { middleware as thunkMiddleware } from 'redux-saga-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './configureReducers';
import sagas from './configureSagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Add middlewares here
let middleware = [thunkMiddleware, sagaMiddleware];

if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware];
}

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState,
        composeEnhancers(
            applyMiddleware(...middleware),
        ));


    store.runSagaTask = () => {
        store.sagaTask = sagaMiddleware.run(sagas);
    };

    // run the rootSaga initially
    store.runSagaTask();

    return store;
}
