import { FormModel, FormLoadInfo, FormFile } from './../models/form';

import { Action } from '@ngrx/store';

import { SaveFileReturn, SaveFileError } from '../../shared/models/api.model';
import { NextIds } from '../models/form';

export enum FormActionTypes {
    AddPage = '[Form] Neue Seite',
    SelectPage = '[Form] Seite selektiert',
    DeletePage = '[Form] Seite geloescht',
    UpdateNextIds = '[Form] Ids wurden aktualisiert',
    Load = '[Form] Load',
    LoadSuccess = '[Form] Load Success',
    LoadError = '[Form] Load failed',
    SaveChanges = '[Form] Formfile speichern',
    SaveChangesSuccess = '[Form] Formfile wurde gespeichert',
    SaveChangesError = '[Form] Fehler beim Speichern',
    OpenSidebar = '[Sidebar] open',
    CloseSidebar = '[Sidebar] close'
}

export class AddPage implements Action {
    readonly type = FormActionTypes.AddPage;

    constructor(public payload: string) {}
}

export class SelectPage implements Action {
    readonly type = FormActionTypes.SelectPage;

    constructor(public payload: number) {}
}

export class OpenSidebar implements Action {
    readonly type = FormActionTypes.OpenSidebar;
}

export class CloseSidebar implements Action {
    readonly type = FormActionTypes.CloseSidebar;
}

export class UpdateNextId implements Action {
    readonly type = FormActionTypes.UpdateNextIds;

    constructor(public payload: NextIds) {}
}

export class Load implements Action {
    readonly type = FormActionTypes.Load;

    constructor(public payload: FormLoadInfo) {}
}

export class LoadSuccess implements Action {
    readonly type = FormActionTypes.LoadSuccess;

    constructor(public payload: FormFile) {}
}

export class LoadError implements Action {
    readonly type = FormActionTypes.LoadError;

    constructor(public payload: any) {}
}

export class SaveChanges implements Action {
    readonly type = FormActionTypes.SaveChanges;

    constructor(public payload: FormModel) {}
}

export class SaveChangesSuccess implements Action {
    readonly type = FormActionTypes.SaveChangesSuccess;

    constructor(public payload: FormModel) {}
}

export class SaveChangesError implements Action {
    readonly type = FormActionTypes.SaveChangesError;

    constructor(public payload: FormModel) {}
}

export type FormActions =
 | AddPage
 | OpenSidebar
 | CloseSidebar
 | UpdateNextId
 | Load
 | LoadSuccess
 | LoadError
 | SaveChanges
 | SaveChangesSuccess
 | SaveChangesError;
