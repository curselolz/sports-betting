import { scopedCreator } from '../store/utils/createAction';

const createAction = scopedCreator('example');

export const example = createAction('EXAMPLE');
export const exampleStart = createAction('EXAMPLE_START');
export const exampleDone = createAction('EXAMPLE_DONE');
export const exampleFail = createAction('EXAMPLE_FAIL');

