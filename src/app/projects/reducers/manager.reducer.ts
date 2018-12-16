
import { ManagerActions, ManagerActionTypes } from '../actions/manager.actions';
import { ExplorerNextIds } from '../models/manager';

export interface State {
    loaded: boolean;
    loading: boolean;
    ids: number[];
    nextId: ExplorerNextIds;
}

const INIT_STATE: State = {
    loaded: false,
    loading: false,
    ids: [],
    nextId: {
        NextFormId: 0,
        NextProjectId: 0
    }
};

export function reducer(
    state = INIT_STATE,
    action: ManagerActions
): State {
    switch (action.type) {
        case ManagerActionTypes.Load: {
            return {
                ...state,
                loading: true
            };
        }

        case ManagerActionTypes.LoadSuccess: {

            return {
                loaded: true,
                loading: false,
                ids: action.payload.Projects.map(project => project.Id),
                nextId: {
                    NextProjectId: action.payload.NextProjectId,
                    NextFormId: action.payload.NextFormId
                }
            };
        }
        case ManagerActionTypes.LoadError: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ManagerActionTypes.AddProjectSuccess: {
            if (state.ids.indexOf(action.payload.return.Id) > -1) {
                return state;
            }
            return {
                ...state,
                ids: [...state.ids, action.payload.return.Id]
            };
        }

        case ManagerActionTypes.UpdateNextIds: {
            return {
                ...state,
                nextId: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getIds = (state: State) => state.ids;
