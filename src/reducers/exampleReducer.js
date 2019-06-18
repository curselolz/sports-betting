import { createReducer } from '../store/utils/createReducer';
import { exampleDone, exampleFail, exampleStart } from '../actions/exampleActions';

const initialState = {
    example: false,
    isLoading: false,
    error: null,
};

export default createReducer({
    [exampleStart]: (state) => ({
        ...state,
        isLoading: true,
    }),
    [exampleDone]: (state, {example}) => ({
        ...state,
        example,
        isLoading: false,
    }),
    [exampleFail]: (state, {error}) => ({
        ...state,
        error,
        isLoading: false,
    }),
}, initialState);
