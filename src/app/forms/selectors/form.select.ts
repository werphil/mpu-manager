import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, FormState } from '../reducers';

import * as fromForm from '../reducers/form.reducer';

// Gibt den aktuellen State insgesamt zurück
export const getState = createFeatureSelector<State, FormState>('forms');

const getFormMetaState = createSelector(
    getState,
    (state: FormState) => state.meta
);


export const getLoaded = createSelector(
    getFormMetaState,
    fromForm.getLoaded
);
export const getLoading = createSelector(
    getFormMetaState,
    fromForm.getLoading
);

export const getForm = createSelector(
    getFormMetaState,
    fromForm.getForm
);
