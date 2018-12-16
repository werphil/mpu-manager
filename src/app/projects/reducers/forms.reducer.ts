import { ManagerActionTypes } from './../actions/manager.actions';
import { ProjectActions, ProjectActionTypes } from './../actions/project.actions';
import { FormActions, FormActionTypes } from './../actions/form.actions';
import { Form } from './../models/forms';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ManagerActions } from '../actions/manager.actions';


export interface State extends EntityState<Form> {
    selectedFormId: number | null;
}

export const adapter: EntityAdapter<Form> = createEntityAdapter<Form>({
    selectId: (form: Form) => form.Id,
    sortComparer: false
});

export const INIT_STATE: State = adapter.getInitialState({
    selectedFormId: null
});

export function reducer(
    state = INIT_STATE,
    action: FormActions | ProjectActions | ManagerActions
): State {
    switch (action.type) {
        case ManagerActionTypes.LoadSuccess: {
            // Normalisieren
            const forms: Form[] = [];

            action.payload.Projects.forEach(project => {
                project.Forms.forEach(form => {
                    forms.push(<Form>{
                            Id: form.Id,
                            Name: form.Name,
                            ProjectId: project.Id,
                            DeployedVersions: form.DeployedVersions,
                            Versions: form.MajorVersions
                        });
                });
            });

            return adapter.addMany(forms, state);
        }

        case ProjectActionTypes.AddFormSuccess: {
            return adapter.addOne(action.payload.return, state);
        }

        case FormActionTypes.Select: {
            return {
                ...state,
                selectedFormId: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getSelectedId = (state: State) => state.selectedFormId;
