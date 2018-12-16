
import { ManagerActions, ManagerActionTypes } from './../actions/manager.actions';
import { ProjectActions, ProjectActionTypes } from './../actions/project.actions';
import { Project } from '../models/project';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';



export interface State extends EntityState<Project> {
    ids: number[];
    selectedProjectId: number | null;
}

export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>({
    selectId: (project: Project) => project.Id,
    sortComparer: false
});

export const INIT_STATE: State = adapter.getInitialState({
    ids: [],
    selectedProjectId: null
});


export function reducer(
    state = INIT_STATE,
    action: ProjectActions | ManagerActions
): State {
    switch (action.type) {
        case ManagerActionTypes.LoadSuccess: {
            // Normalisieren
            return adapter.addMany(action.payload.Projects.map(
                project => {
                    return {
                        Id: project.Id,
                        Name: project.Name
                    };
                }
            ), state);
        }

        case ManagerActionTypes.AddProjectSuccess: {
            // Normalize
            return adapter.addOne({
                Id: action.payload.return.Id,
                Name: action.payload.return.Name
            }, state);
        }

        case ProjectActionTypes.AddFormSuccess: {
            if (state.ids.indexOf(action.payload.return.Id) > -1) {
                return state;
            }
            return {
                ...state,
                ids: [...state.ids, action.payload.return.Id]
            };
        }

        case ProjectActionTypes.Select: {
            return {
                ...state,
                selectedProjectId: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getSelectedId = (state: State) => state.selectedProjectId;
export const getIds = (state: State) => state.ids;
