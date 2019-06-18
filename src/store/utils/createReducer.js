export const DefaultCase = Symbol('DefaultCase');

export const createReducer = (declaration, initialValue) => {
    return function reducerFn(state = initialValue, action) {
        const reducer = declaration[action.type] || declaration[DefaultCase];

        return reducer ? reducer(state, action.payload, action) : state;
    };
};
