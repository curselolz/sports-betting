import { scopedCreator } from '../store/utils/createAction';

const createAction = scopedCreator('lobby');

export const loadEvents = createAction('LOAD_EVENTS');
export const loadEventsStart = createAction('LOAD_EVENTS_START');
export const loadEventsDone = createAction('LOAD_EVENTS_DONE');
export const loadEventsFail = createAction('LOAD_EVENTS_FAIL');
