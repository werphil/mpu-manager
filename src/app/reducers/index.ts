import { environment } from './../../environments/environment';
import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';
import * as fromSharepoint from '../core/reducers';

export interface State {
    router: fromRouter.RouterReducerState;
    sharepoint: fromSharepoint.State;
}

export const reducers: ActionReducerMap<State> = {
    router: fromRouter.routerReducer,
    sharepoint: fromSharepoint.reducer
};

/**
 * Loggt alle State-Änderungen mit in der dev-mode
 */
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        // console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}

// evtl. storeFreeze für devmode noch
export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];
