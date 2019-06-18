import { createReducer } from '../store/utils/createReducer';
import { loadEventsDone, loadEventsFail, loadEventsStart } from '../actions/lobbyActions';

const initialState = {
    eventGroups: [],
    isLoading: false,
    error: null,
};

export default createReducer({
    [loadEventsStart]: (state) => ({
        ...state,
        isLoading: true,
    }),
    [loadEventsDone]: (state, payload) => ({
        ...state,
        ...payload,
        isLoading: false,
    }),
    [loadEventsFail]: (state, {error}) => ({
        ...state,
        error,
        isLoading: false,
    }),
}, initialState);
