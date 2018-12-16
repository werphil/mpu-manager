import { SaveFileError } from './../../shared/models/api.model';
import { Action } from '@ngrx/store';
import { Project } from '../models/project';
import { SaveFileReturn } from '../../shared/models/api.model';
import { Form, NewForm } from '../models/forms';


export enum ProjectActionTypes {
    AddForm = '[Project] Neues Formular',
    AddFormSuccess = '[Project] Neues Formular gespeichert.',
    AddFormError = '[Project] Neues Formular Fehler',
    Select = '[Project] wird selektiert',
    LoadSuccess = '[Project] wurde geladen',
    LoadError = '[Project] konnte nicht geladen werden'
}

export class AddForm implements Action {
    readonly type = ProjectActionTypes.AddForm;

    constructor(public payload: NewForm) {}
}
export class AddFormSuccess implements Action {
    readonly type = ProjectActionTypes.AddFormSuccess;

    constructor(public payload: SaveFileReturn<Form>) {}
}
export class AddFormError implements Action {
    readonly type = ProjectActionTypes.AddFormError;

    constructor(public payload: SaveFileError<Form>) {}
}

export class Select implements Action {
    readonly type = ProjectActionTypes.Select;

    constructor(public payload: number) {}
}

export class LoadSuccess implements Action {
    readonly type = ProjectActionTypes.LoadSuccess;

    constructor(public payload: Project) {}
}

export class LoadError implements Action {
    readonly type = ProjectActionTypes.LoadError;

    constructor(public payload: Project) {}
}



export type ProjectActions =
 | AddForm
 | AddFormSuccess
 | AddFormError
 | Select
 | LoadSuccess
 | LoadError;
