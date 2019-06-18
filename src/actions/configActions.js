import { scopedCreator } from '../store/utils/createAction';

const createAction = scopedCreator('config');

export const setConfig = createAction('SET_CONFIG');
