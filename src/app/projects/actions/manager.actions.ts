import { ExplorerFile, ExplorerNextIds } from './../models/manager';
import { Action } from '@ngrx/store';
import { Project } from '../models/project';
import { SaveFileReturn, SaveFileError } from '../../shared/models/api.model';

export enum ManagerActionTypes {
    AddProject = '[Manager] Neues Projekt',
    AddProjectSuccess = '[Manager] Neues Projekt gespeichert',
    AddProjectError = '[Manager] Neues Projekt Fehler',
    UpdateNextIds = '[Manager] Formular und Projekt-Ids aktualisiert',
    Load = '[Manager] Load',
    LoadSuccess = '[Manager] Load Success',
    LoadError = '[Manager] Load failed',
    SaveChanges = '[Manager] Liste speichern',
    SaveChangesSuccess = '[Manager] Liste wurde gespeichert',
    SaveChangesError = '[Manager] Fehler beim Speichern'
}

export class AddProject implements Action {
    readonly type = ManagerActionTypes.AddProject;

    constructor(public payload: string) {}
}

export class AddProjectSuccess implements Action {
    readonly type = ManagerActionTypes.AddProjectSuccess;

    constructor(public payload: SaveFileReturn<Project>) {}
}

export class AddProjectError implements Action {
    readonly type = ManagerActionTypes.AddProjectError;

    constructor(public payload: SaveFileError<Project>) {}
}

export class UpdateNextId implements Action {
    readonly type = ManagerActionTypes.UpdateNextIds;

    constructor(public payload: ExplorerNextIds) {}
}

export class Load implements Action {
    readonly type = ManagerActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = ManagerActionTypes.LoadSuccess;

    constructor(public payload: ExplorerFile) {}
}

export class LoadError implements Action {
    readonly type = ManagerActionTypes.LoadError;

    constructor(public payload: any) {}
}

export class SaveChanges implements Action {
    readonly type = ManagerActionTypes.SaveChanges;

    constructor(public payload: ExplorerFile) {}
}

export class SaveChangesSuccess implements Action {
    readonly type = ManagerActionTypes.SaveChangesSuccess;

    constructor(public payload: ExplorerFile) {}
}

export class SaveChangesError implements Action {
    readonly type = ManagerActionTypes.SaveChangesError;

    constructor(public payload: ExplorerFile) {}
}

export type ManagerActions =
 | AddProject
 | AddProjectSuccess
 | AddProjectError
 | UpdateNextId
 | Load
 | LoadSuccess
 | LoadError
 | SaveChanges
 | SaveChangesSuccess
 | SaveChangesError;
