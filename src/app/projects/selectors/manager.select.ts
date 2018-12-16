import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, ProjectExplorerState } from '../reducers';

import * as fromManager from '../reducers/manager.reducer';

// Gibt den aktuellen State insgesamt zurück
export const getState = createFeatureSelector<State, ProjectExplorerState>('projects');

const getExplorerState = createSelector(
    getState,
    (state: ProjectExplorerState) => state.explorer
);

export const getNextIds = createSelector(
    getExplorerState,
    (state) => state.nextId
);

export const getLoaded = createSelector(
    getExplorerState,
    fromManager.getLoaded
);
export const getLoading = createSelector(
    getExplorerState,
    fromManager.getLoading
);

export const getIds = createSelector(
    getExplorerState,
    fromManager.getIds
);
