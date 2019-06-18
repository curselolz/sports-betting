import { createReducer } from '../store/utils/createReducer';
import defaultConfig from '../utils/defaultConfig';
import { setConfig } from '../actions/configActions';

const initialState = defaultConfig;

export default createReducer({
    [setConfig]: (state, payload) => ({
        ...state,
        ...payload,
    }),
}, initialState);
