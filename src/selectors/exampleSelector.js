import { createSelector } from 'reselect';

const ModuleState = ({ example }) => example;

export const getLoading = createSelector(
    ModuleState,
    (state) => state.isLoading,
);
