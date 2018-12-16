import { getState } from './manager.select';
import { createSelector } from '@ngrx/store';
import * as fromProject from '../reducers/projects.reducer';

const getEntityState = createSelector(
    getState,
    state => state.projects
);

export const {
    selectIds: getProjectIds,
    selectEntities: getProjectEntities
} = fromProject.adapter.getSelectors(getEntityState);

export const getSelectedId = createSelector(
    getEntityState,
    fromProject.getSelectedId
);
