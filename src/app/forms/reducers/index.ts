import { ActionReducerMap } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromForm from './form.reducer';
import * as fromElement from './element.reducer';

export interface FormState {
    meta: fromForm.State;
    elements: fromElement.State;
}

export interface State extends fromRoot.State {
    forms: FormState;
}

export const reducers: ActionReducerMap<FormState> = {
    meta: fromForm.reducer,
    elements: fromElement.reducer
};

