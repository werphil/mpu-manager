import { ActionReducerMap } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromManager from './manager.reducer';
import * as fromProject from './projects.reducer';
import * as fromForms from './forms.reducer';

export interface ProjectExplorerState {
    explorer: fromManager.State;
    projects: fromProject.State;
    forms: fromForms.State;
}

export interface State extends fromRoot.State {
    projects: ProjectExplorerState;
}

export const reducers: ActionReducerMap<ProjectExplorerState> = {
    explorer: fromManager.reducer,
    projects: fromProject.reducer,
    forms: fromForms.reducer
};

