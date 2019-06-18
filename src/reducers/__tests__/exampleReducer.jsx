import reducer from '../exampleReducer';
import { exampleDone, exampleFail, exampleStart } from '../../actions/exampleActions';

describe('example reducers', () => {
    it('should return the example initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            example: false,
            isLoading: false,
            error: null,
        });
    });

    it('should handle example actions start', () => {
        // example start
        expect(reducer(undefined, exampleStart())).toEqual({
            example: false,
            isLoading: true,
            error: null,
        });
    });

    it('should handle example actions done', () => {
        expect(reducer(
            {
                example: false,
                isLoading: true,
                error: null,
            },
            exampleDone({ example: true })),
        ).toEqual({
            example: true,
            isLoading: false,
            error: null,
        });
    });


    it('should handle example actions fail', () => {
        expect(reducer(
            {
                example: false,
                isLoading: true,
                error: null,
            },
            exampleFail({ error: 'error' })),
        ).toEqual({
            example: false,
            isLoading: false,
            error: 'error',
        });
    });
});
