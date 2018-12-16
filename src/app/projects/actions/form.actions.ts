import { Action } from '@ngrx/store';
import { Form } from '../models/forms';


export enum FormActionTypes {
    SaveChanges = '[Formular] Änderungen speichern',
    Select = '[Formular] wurde selektiert',
    SetStage = '[Formular] Stage für Version setzen'
}

export class SaveChanges implements Action {
    readonly type = FormActionTypes.SaveChanges;

    constructor(public payload: Form) {}
}
export class Select implements Action {
    readonly type = FormActionTypes.Select;

    constructor(public payload: number) {}
}

export type FormActions =
 | SaveChanges
 | Select;
