import { CoreActions, CoreActionTypes } from '../actions/core.actions';



export interface State {
    isConnected: boolean;
    currentUser: string;
}

const INIT_STATE: State = {
    isConnected: false,
    currentUser: 'N/A'
};

export function reducer(
    state: State = INIT_STATE,
    action: CoreActions
): State {
    switch (action.type) {
        case CoreActionTypes.GetCurrentUser: {
            return {
                ...state,
                currentUser: action.payload
            };
        }
        default: {
            return state;
        }
    }
}
