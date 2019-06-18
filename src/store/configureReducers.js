import { combineReducers } from 'redux';
import example from '../reducers/exampleReducer';
import config from '../reducers/configReducer';
import lobby from '../reducers/lobbyReducer';

export default combineReducers({
    example,
    config,
    lobby,
});
