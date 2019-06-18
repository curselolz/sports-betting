import { call, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import WebSocket from './websocket';
import eventsList from '../services/events';

// TODO: check or change for actions with action creators

// this function creates an event channel from a given socket
// Setup subscription to incoming `ping` events
function createSocketChannel({ connection, events, props }) {
    // `eventChannel` takes a subscriber function
    // the subscriber function takes an `emit` argument to put messages onto the channel
    return eventChannel(emit => {
        // setup the subscription
        events.forEach((event) => {
            connection.on({
                event,
                props,
            }, (payload) => emit({
                event,
                payload,
            }));
        });

        // the subscriber must return an unsubscribe function
        return connection.unsubscribe;
    });
}

export default function* channel({ events, ...props }) {
    const connection = yield call([WebSocket, WebSocket.getConnection]);

    const socketChannel = yield call(createSocketChannel, {
        connection,
        events,
        props,
    });

    while (true) {
        try {
            const { event, payload } = yield take(socketChannel);

            const action = eventsList[event].actionName;
            yield put(action(payload));
        } catch (err) {
            console.error('socket error:', err);
        }
    }
}
